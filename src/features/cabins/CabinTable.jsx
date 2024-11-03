import { useSearchParams } from 'react-router-dom';

import CabinRow from './CabinRow';
import {useCabins} from './useCabins';

import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Empty from '../../ui/Empty';

// import { Suspense } from 'react';

const CabinTable = () => {

  const {isLoading, cabins} = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

	if (!cabins.length) return <Empty resourceName={'cabins'} />;

  // Filter
  const filterValue = searchParams.get('discount') || 'all';

	const filteredCabins = cabins.filter((cabin) => {
		if (filterValue === 'no-discount') return cabin.discount === 0;
		if (filterValue === 'with-discount') return cabin.discount > 0;
		return true; // Handles 'all' and any other cases
	});

  // SortBy
  const sortBy = searchParams.get('sortBy') || 'nameCabin-asc';
	
  const [field, direction] = sortBy.split('-');
	
  const modifier = direction === 'asc' ? 1 : -1;
	

  const sortedCabins = filteredCabins.sort((a, b) => {
		const aValue = a[field];
		const bValue = b[field];
	
		// Handle undefined or null values
		if (aValue == null && bValue == null) return 0;
		if (aValue == null) return -1 * modifier;
		if (bValue == null) return 1 * modifier;
	
		// Check if values are both strings
		if (typeof aValue === 'string' && typeof bValue === 'string') {
			return aValue.localeCompare(bValue) * modifier;
		}
	
		// For numbers
		if (typeof aValue === 'number' && typeof bValue === 'number') {
			return (aValue - bValue) * modifier;
		}
	
		// If types are different, convert to strings and compare
		return String(aValue).localeCompare(String(bValue)) * modifier;
	});

  return (
    <Menus>
      <Table columns="0.6fr 1.5fr 2.2fr 1fr 1fr 0.4fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
