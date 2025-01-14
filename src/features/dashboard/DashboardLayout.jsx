import styled from 'styled-components';
import useRecentStays from './useRecentStays';
import useRecentBookings from './useRecentBookings';
// import { useCabins } from 'features/cabins/useCabins';

// import DurationChart from 'features/dashboard/DurationChart';
// import SalesChart from 'features/dashboard/SalesChart';
// import Stats from 'features/dashboard/Stats';
// import TodayActivity from 'features/check-in-out/TodayActivity';

import Spinner from '../../ui/Spinner';



const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

/*
We need to distinguish between two types of data here:
1) BOOKINGS: the actual sales. For example, in the last 30 days, the hotel might have sold 10 bookings online, but these guests might only arrive and check in in the far future (or not, as booking also happen on-site)
2) STAYS: the actual check-in of guests arriving for their bookings. We can identify stays by their startDate, together with a status of either 'checked-in' (for current stays) or 'checked-out' (for past stays)
*/

const DashboardLayout = () => {
	const { isLoading: isLoadingBook, bookings } = useRecentBookings();
  const { isLoading: isLoadingStay, confirmedStays } = useRecentStays();
  // const { isLoading: isLoading3, cabins } = useCabins();

  // if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;
	if (isLoadingBook || isLoadingBook) return <Spinner />;

	console.log(bookings);
	console.log(confirmedStays);

  return (
    <StyledDashboardLayout>
			<div>1</div>
			<div>2</div>
			<div>3</div>
			<div>4</div>
      {/* <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} /> */}
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
