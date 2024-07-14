import { useEffect,useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";

function Cabins() {
	const [cabins, setCabins] = useState([]);
	useEffect(() => {
		getCabins().then((cabins) => setCabins(cabins));
	}, []);

  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
			{cabins.length > 0 && <img src={cabins[0].image} alt="cabin" />}
    </Row>
  );
}

export default Cabins;
