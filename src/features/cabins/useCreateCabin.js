import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {createOrEditCabin} from '../../services/apiCabins';

export const useCreateCabin = () => {
	const queryClient = useQueryClient();
	const {mutate: createCabin, isLoading: isCreating} = useMutation({
		mutationFn: createOrEditCabin,
		onSuccess: () => {
			toast.success('Cabin created successfully');
			queryClient.invalidateQueries({queryKey: ['cabins']});
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	return {isCreating, createCabin};
};