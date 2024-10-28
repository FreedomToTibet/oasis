import { useEffect, useRef } from 'react';

const useOutsideClick = (callback, listenCapturing) => {
	const ref = useRef();

	const handleClick = e => {
		if (ref.current && !ref.current.contains(e.target)) callback();
	};

	useEffect(() => {
		document.addEventListener('click', handleClick, listenCapturing);
		return () => document.removeEventListener('click', handleClick, listenCapturing);
	}, [callback, listenCapturing]);

	return ref;
};

export default useOutsideClick;