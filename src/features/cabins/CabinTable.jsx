import styled from 'styled-components';
import CabinRow from './CabinRow';
import Spinner from '../../ui/Spinner';
import {useCabins} from './useCabins';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
// import Empty from 'ui/Empty';
// import { useSearchParams } from 'react-router-dom';
// import { Suspense } from 'react';

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function CabinTable() {
  // We enabled Suspense on this query with React Query. This will make it so that this component is SUSPENDED while the data is still loading. We then have to add a <Suspense> boundary somewhere OUTSIDE this component to instruct React to SUSPEND, so to PAUSE, the rendering of this component until the data has been loaded.
  // So basically, we are delegating the loading (and also error handling) to the nearest Suspense up in the tree. That Suspense boundary keeps WAITING until the component is no longer suspending, and then renders it.
  // So, React Query made loading data SO MUCH EASIER, as it creates the loading states for us. BUT, we still have to manage displaying loading spinners in the UI manually. With suspense, that's all gone! It can basically "decide" not to render this component until the data has arrived. This is completely different... Before Suspense, components ALWAYS rendered, but we could choose to then render a spinner while the data has not arrived yet. With Suspense it's different. The component will not even be rendered in the first place. This is what React's modern "concurrent features" are all about, where things can be deferred into the FUTURE (such as rendering components, in this case)

  // It's EXTREMELY important to understand that this functionality is enabled by React Query, and can also be enabled by other data loading libraries or frameworks. But we as developers can NOT directly tell React "hey, this component should be suspended until some data is arriving", at least not yet. For example, React won't automatically detect when we're fetching data in a component in a useEffect or so. There will be something in the future, and then I will add it to the course, but not yet

  // Now, everything that's inside a Suspense will be treated as just one unit, so when just one component of the child components is currently suspended, all of them will be replaced with the fallback. We can nest multiple Suspense boundaries, and the closest one will be shown. This way, when we have a big Suspense on the top on the tree, it won't have to WAIT

  const {isLoading, cabins, error} = useCabins();

  if (isLoading) return <Spinner />;

  // const { cabins } = useCabins();
  // const [searchParams] = useSearchParams();

  // if (!cabins) return <Empty resource={'cabins'} />;

  // 1) Filter
  // const filterValue = searchParams.get('discount') || 'all';

  // This is probably not the most efficient way, but that doesn't matter
  // let filteredCabins;
  // if (filterValue === 'all') filteredCabins = cabins;
  // if (filterValue === 'no-discount')
  //   filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  // if (filterValue === 'with-discount')
  //   filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

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
          data={cabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

// We could create yet another layer of abstraction on top of this. We could call this component just <Results>, like: Results({data, count, isLoading, columns, rowComponent}). Then <CabinTable> and ALL other tables would simply call that.
// BUT, creating more abstractions also has a cost! More things to remember, more complex codebase to understand. Sometimes it's okay to just copy and paste instead of creating abstractions

export default CabinTable;
