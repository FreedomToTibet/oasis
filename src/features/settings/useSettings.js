import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export const useSettings = () => {
	const { isLoading, error, data: settings } = useQuery({
		queryKey: ["settings"],
		queryFn: getSettings,
	});

	return {settings, isLoading, error};
};