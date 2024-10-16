import { useEffect,useState } from "react";

import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
// import { getCabins } from "../services/apiCabins";

function Cabins() {
	const [showForm, setShowForm] = useState(false);
	// const [cabins, setCabins] = useState([]);
	// useEffect(() => {
	// 	getCabins().then((cabins) => setCabins(cabins));
	// }, []);

  return (
		<>
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>Filter / Sort</p>
			{/* {cabins.length > 0 && <img src={cabins[0].image} alt="cabin" />} */}
    </Row>
		<Row>
			<CabinTable/>
			<Button onClick={() => setShowForm(showForm => !showForm)}>Add new cabin</Button>
			{showForm && <CreateCabinForm />}
		</Row>
	</>
  );
}

export default Cabins;
