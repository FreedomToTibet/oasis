import AddCabin from "../features/cabins/AddCabin";
import CabinTable from "../features/cabins/CabinTable";

import Heading from "../ui/Heading";
import Row from "../ui/Row";
// import { getCabins } from "../services/apiCabins";

const Cabins = () => {

  return (
		<>
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>Filter / Sort</p>
    </Row>
		<Row>
			<CabinTable/>
			<AddCabin />
		</Row>
	</>
  );
}

export default Cabins;
