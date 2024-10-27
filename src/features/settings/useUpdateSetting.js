import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateSetting as updateSettingApi } from '../../services/apiSettings';

export const useUpdateSetting = () => {
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      queryClient.invalidateQueries(['settings']);
      toast.success('Settings updated');
    },
    onError: (error) => {
      toast.error(`Error updating settings: ${error.message}`);
    },
  });

  return { isUpdating, updateSetting };
};