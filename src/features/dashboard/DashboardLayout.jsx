import styled from 'styled-components';
import useRecentStays from './useRecentStays';
import useRecentBookings from './useRecentBookings';
import { useCabins } from '../cabins/useCabins';

// import DurationChart from 'features/dashboard/DurationChart';
// import SalesChart from 'features/dashboard/SalesChart';
import Stats from './Stats';
// import TodayActivity from 'features/check-in-out/TodayActivity';

import Spinner from '../../ui/Spinner';



const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
	const { isLoading: isLoadingBook, bookings } = useRecentBookings();
  const { isLoading: isLoadingStay, confirmedStays, numDays } = useRecentStays();
  const { isLoading: isLoadingCabin, cabins } = useCabins();

	if (isLoadingBook || isLoadingStay || isLoadingCabin) return <Spinner />;

  return (
    <StyledDashboardLayout>
			<Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
			<div>2</div>
			<div>3</div>
			<div>4</div>
      {/*
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} /> */}
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
