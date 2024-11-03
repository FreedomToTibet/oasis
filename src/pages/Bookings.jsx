import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingTable from "../features/bookings/BookingTable";
import BookingTableOpereations from "../features/bookings/BookingTable";

function Bookings() {
  return (
		<>
		 <Row type="horizontal">
				<Heading as="h1">All bookings</Heading>
				<BookingTableOpereations />
    	</Row>
		<BookingTable />
		</>
  );
}

export default Bookings;
