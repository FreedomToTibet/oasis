import supabase from './supabase.js';

export async function getCabins() {
	
	const { data, error } = await supabase.from('cabins').select('*');

	if (error) {
		console.error("Cabins loading error: ", error);
		throw new Error(error.message);
	}

	return data;
}