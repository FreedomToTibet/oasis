import supabase, {supabaseUrl} from './supabase.js';

export async function getCabins() {
  const {data, error} = await supabase.from('cabins').select('*');

  if (error) {
    console.error('Cabins loading error: ', error);
    throw new Error(error.message);
  }

  return data;
}

export async function getCabinById(id) {
  const {data, error} = await supabase.from('cabins').select('*').eq('id', id);

  if (error) {
    console.error('Cabin loading error: ', error);
    throw new Error(error.message);
  }

  return data[0];
}

export async function createOrEditCabin(cabin, id) {
  const isHasImage =
    typeof cabin.image === 'string' && cabin.image.startsWith(supabaseUrl);
  
  const imagePath = isHasImage
    ? cabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins/${cabin.image.name}`;

  // 1. Creating/editing cabin
  let query = supabase.from('cabins');

  // Creating a new cabin
  if (!id) query = query.insert([{...cabin, image: imagePath}]);

  // Editing an existing cabin
  if (id) query = query.update({...cabin, image: imagePath}).eq('id', id);

  const {data, error} = await query.select().single();

  if (error) {
    console.error('Cabin creation error: ', error);
    throw new Error(error.message);
  }

  // 2. Uploading image
  const isNewImage = typeof cabin.image !== 'string';
  // 2. Uploading image if it's new
  if (isNewImage) {
    const {error: storageError} = await supabase.storage
      .from('cabins')
      .upload(cabin.image.name, cabin.image);

    // 3. Delete cabin if image upload failed
    if (storageError) {
      await deleteCabin(data.id);
      console.error('Image upload error: ', storageError);
      throw new Error(storageError.message);
    }
  }

  return data;
}

export async function updateCabin(cabin) {
  const {data, error} = await supabase.from('cabins').update(cabin).eq('id', cabin.id);

  if (error) {
    console.error('Cabin update error: ', error);
    throw new Error(error.message);
  }

  return data;
}

export async function deleteCabin(id) {
  // Fetch the cabin data to get the image path
  const { data: cabinData, error: fetchError } = await supabase
    .from('cabins')
    .select('image')
    .eq('id', id)
    .single();

  if (fetchError) {
    console.error('Cabin fetch error:', fetchError);
    throw new Error(fetchError.message);
  }

  if (!cabinData) {
    throw new Error('Cabin not found.');
  }

	const imageUrl = cabinData.image;

	// Delete the cabin row from the table
	const { data: deleteData, error: deleteError } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id)
		.select();

  if (deleteError) {
    console.error('Cabin deletion error:', deleteError);
    throw new Error(deleteError.message);
  }

	if (!deleteData || deleteData.length === 0) {
    throw new Error('Cabin not found or already deleted.');
  }

	// Check if any other cabins are using the same image
	const { data: cabinsUsingImage, error: imageUsageError } = await supabase
    .from('cabins')
    .select('id')
    .eq('image', imageUrl);

  if (imageUsageError) {
    console.error('Error checking image usage:', imageUsageError);
    throw new Error(imageUsageError.message);
  }

  // Extract the image name from the image path
  if (cabinsUsingImage.length === 0) {
    const imageName = imageUrl.split('/').pop();

    // Delete the image from the storage
    const { error: storageError } = await supabase.storage
      .from('cabins')
      .remove([imageName]);

    if (storageError) {
      console.error('Error deleting image:', storageError);
      throw new Error(storageError.message);
    }
  }

  // Check for and delete any entries in the storage named "undefined"
  // const { data: undefinedEntries, error: undefinedEntriesError } = await supabase.storage
  //   .from('cabins')
  //   .list('', { limit: 20 });

  // if (undefinedEntriesError) {
  //   console.error('Error fetching undefined entries:', undefinedEntriesError);
  //   throw new Error(undefinedEntriesError.message);
  // }

  // for (const entry of undefinedEntries) {
  //   if (entry.name === 'undefined') {
  //     const { error: deleteError } = await supabase.storage
  //       .from('cabins')
  //       .remove([entry.name]);
  //     if (deleteError) {
  //       console.error('Error deleting undefined entry:', deleteError);
  //       throw new Error(deleteError.message);
  //     }
  //   }
  // }

  return deleteData;
}
