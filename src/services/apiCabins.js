import supabase from './supabase.js';

export async function getCabins() {
	
	const { data, error } = await supabase.from('cabins').select('*');

	if (error) {
		console.error("Cabins loading error: ", error);
		throw new Error(error.message);
	}

	return data;
}

export async function getCabinById(id) {
	
	const { data, error } = await supabase.from('cabins').select('*').eq('id', id);

	if (error) {
		console.error("Cabin loading error: ", error);
		throw new Error(error.message);
	}

	return data[0];
}

export async function createCabin(cabin) {
	
	const { data, error } = await supabase.from('cabins').insert([cabin]);

	if (error) {
		console.error("Cabin creation error: ", error);
		throw new Error(error.message);
	}

	return data;
}

export async function updateCabin(cabin) {
	
	const { data, error } = await supabase.from('cabins').update(cabin).eq('id', cabin.id);

	if (error) {
		console.error("Cabin update error: ", error);
		throw new Error(error.message);
	}

	return data;
}

export async function deleteCabin(id) {
	
	const { data, error } = await supabase.from('cabins').delete().eq('id', id);

	if (error) {
		console.error("Cabin deletion error: ", error);
		throw new Error(error.message);
	}

	return data;
}