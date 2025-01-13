import ButtonIcon from "./ButtonIcon";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useTheme } from "../context/ThemeContext";

const LightDarkSwitch = () => {
	const { theme, toggleTheme } = useTheme();

	return(
		<ButtonIcon onClick={toggleTheme}>
			{theme === 'dark' ? <HiOutlineSun /> : <HiOutlineMoon />}
		</ButtonIcon>
	);
};

export default LightDarkSwitch;