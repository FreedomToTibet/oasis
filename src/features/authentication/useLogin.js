import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { login as loginApi} from '../../services/apiAuth';

const useLogin = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const {mutate: login, isLoading} = useMutation({
		mutationFn: ({ email, password }) => loginApi({ email, password }),

		onSuccess: (user) => {
			queryClient.setQueryData(["user"], user.user);
		
			document.documentElement.className = `${user.user.user_metadata.theme}-mode`;
			
			navigate('/dashboard', { replace: true });
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