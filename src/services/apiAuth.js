import supabase, {supabaseUrl} from "./supabase";

export const login = async ({ email, password }) => {
	const { data, error } = await supabase.auth.signInWithPassword({ 
		email, 
		password, 
	});

	if (error) throw new Error(error.message);

	return data;
}

export const getCurrentUser = async () => {
	const { data: session } = await supabase.auth.getSession();
	if (!session.session) return null;

	const { data, error } = await supabase.auth.getUser();

	if (error) throw new Error(error.message);
	return data?.user;
}

export const logout = async () => {
	const { error } = await supabase.auth.signOut();
	if (error) throw new Error(error.message);
}

export const signup = async ({ fullName, email, password }) => {
	const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
				theme: "light",
      },
    },
  });

	if (error) throw new Error(error.message);

	return data;
}

export const updateCurrentUser = async ({ password, fullName, avatar, theme }) => {
	// 1. Update password OR fullName
	let updateData;

	if (password) updateData = { password };
	if (fullName) updateData = { data: { fullName } };
	if (theme !== undefined) updateData = { data: {theme} };

	try {
		const { data, error } = await supabase.auth.updateUser(updateData);

	if (error) throw new Error(error.message);
	if (!avatar) return data;
	} catch (error) {
		console.error("Error updating user:", error);
    throw new Error(error.message);
	}

	// 2. Upload the avatar image
	const fileName = `avatar-${data.user.id}`;

	const { error: storageError } = await supabase.storage
		.from("avatars")
		.upload(fileName, avatar);

	if (storageError) throw new Error(storageError.message);

	// 3. Update the user metadata with the avatar URL
	const { data: updatedUser, error: updateError } = await supabase.auth.updateUser({
		data: {
			avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`
		},
	});

	if (updateError) throw new Error(updateError.message);

	return updatedUser;
}

export const verifyPassword = async ({ email, password }) => {
	const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

	if (error) return false;
  return true;
}