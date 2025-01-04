import { createContext, useContext, useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";

import styled from "styled-components";
import useOutsideClick from "../hooks/useOutsideClick";

const Menu = styled.div`
	position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: absolute;
  /* position: fixed; */
	z-index: 100;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  /* left: ${(props) => props.position.x}px; */
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 120%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 3.4rem 1.2rem 1.2rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

const Menus = ({ children }) => {
	const [openId, setOpenId] = useState("");
	const [position, setPosition] = useState({ x: 0, y: 0 });

	const close = () => setOpenId("");
	const open = setOpenId;
	
	return (
		<MenusContext.Provider value={{ openId, close, open, position, setPosition }}>
			{children}
		</MenusContext.Provider>
	);
}

const Toggle = ({ id }) => {
	const { openId, open, close, setPosition } = useContext(MenusContext);

	const handleClick = (e) => {
		e.stopPropagation();
		e.preventDefault();

		const reactangle = e.target.closest("button").getBoundingClientRect();
		
		// setPosition({ 
		// 	x: window.innerWidth - reactangle.width - reactangle.right, 
		// 	y: reactangle.y + reactangle.height + 8});
		setPosition({
			x: -8,
			y: reactangle.height,
		});
		openId === id ? close() : open(id);
	}
	
	return (
		<StyledToggle onClick={handleClick}>
			<HiEllipsisVertical />
		</StyledToggle>
	);
};

const List = ({ id, children }) => {
	const { openId, position, close } = useContext(MenusContext);
	const ref = useOutsideClick(() => openId === id && close());

	// return openId === id ? (
	// 	createPortal(<StyledList position={ position } ref={ref}>
	// 		{children}
	// 	</StyledList>, document.body)
	// ) : null;
	return openId === id ? (
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>
  ) : null;
};

const Button = ({ children, icon, onClick }) => {
	const { close } = useContext(MenusContext);

	const handleClick = (e) => {
		e.stopPropagation();
		onClick?.();
		close();
	}

	return (
		<li>
			<StyledButton onClick={handleClick}>
				{icon}
				<span>{children}</span>
			</StyledButton>
		</li>
	)
};

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;