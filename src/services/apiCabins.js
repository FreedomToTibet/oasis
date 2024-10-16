import supabase, { supabaseUrl } from './supabase.js';

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
	const imagePath = `${supabaseUrl}/storage/v1/object/public/cabins/${cabin.image.name}`;
	
	// 1. Creating cabin
	const { data, error } = await supabase.from('cabins').insert([{...cabin, image: imagePath}]);

	if (error) {
		console.error("Cabin creation error: ", error);
		throw new Error(error.message);
	}

	// 2. Uploading image
	const { error: storageError } = await supabase.storage
		.from('cabins')
		.upload(`${cabin.image.name}`, cabin.image);

	// 3. Delete cabin if image upload failed
	if (storageError) {
		await deleteCabin(data.id);
		console.error("Image upload error: ", storageError);
		throw new Error(storageError.message);
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