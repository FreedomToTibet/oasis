import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { login as loginApi} from '../../services/apiAuth';

const useLogin = () => {
	const navigate = useNavigate();

	const {mutate: login, isLoading} = useMutation({
		mutationFn: ({ email, password }) => loginApi({ email, password }),

		onSuccess: () => {
			navigate('/dashboard');
		},

		onError: (error) => {
			console.error("Error", error);
			toast.error("Login or password is incorrect");
		},
	});

	return {
		login,
		isLoading,
	};
};

export default useLogin;