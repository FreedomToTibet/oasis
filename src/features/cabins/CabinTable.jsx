import { useSearchParams } from 'react-router-dom';

import CabinRow from './CabinRow';
import {useCabins} from './useCabins';

import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
// import Empty from '../../ui/Empty';

// import { Suspense } from 'react';

const CabinTable = () => {

  const {isLoading, cabins} = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;


  // if (!cabins) return <Empty resource={'cabins'} />;

  // Filter
  const filterValue = searchParams.get('discount') || 'all';

	const filteredCabins = cabins.filter((cabin) => {
		if (filterValue === 'no-discount') return cabin.discount === 0;
		if (filterValue === 'with-discount') return cabin.discount > 0;
		return true; // Handles 'all' and any other cases
	});

  // 2) SortBy
  // const sortBy = searchParams.get('sortBy') || 'startDate-asc';
  // const [field, direction] = sortBy.split('-');
  // const modifier = direction === 'asc' ? 1 : -1;

  // This one is better!
  // .sort((a, b) => a[field].localeCompare(b[field]) * modifier);

  // const sortedCabins = filteredCabins.sort(
  //   (a, b) => (a[field] - b[field]) * modifier
  // );

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
          data={filteredCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
