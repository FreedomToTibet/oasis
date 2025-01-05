import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteBooking as deleteBookingApi} from '../../services/apiBookings';

export const useDeleteBooking = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

  const {isLoading: isDeleting, mutate: deleteBooking} = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success('Booking deleted');
      queryClient.invalidateQueries({
        queryKey: ['bookings'],
      });
    },
    onError: (error) => toast.error(error.message),
		onSettled: () => navigate('/bookings'),
  });

	return {isDeleting, deleteBooking};
};

