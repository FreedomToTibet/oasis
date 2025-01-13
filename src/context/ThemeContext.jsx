import {createContext, useContext, useState, useEffect} from 'react';
import useUser from '../features/authentication/useUser';
import {useUpdateUser} from '../features/authentication/useUpdateUser';
import Spinner from '../ui/Spinner';

const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({children}) => {
  const {user, isLoading} = useUser();
  const {updateUser} = useUpdateUser();

  const [theme, setTheme] = useState(() => {
    return user?.user_metadata?.theme || 'dark';
  });

  useEffect(() => {
    if (user?.user_metadata?.theme) {
      setTheme(user.user_metadata.theme);
      document.documentElement.className =
        user.user_metadata.theme === 'dark' ? 'dark-mode' : 'light-mode';
    }
  }, [user?.user_metadata?.theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.className = newTheme === 'dark' ? 'dark-mode' : 'light-mode';
    console.log('toggleTheme and theme', newTheme);
    if (user) {
      updateUser({theme: newTheme});
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>{children}</ThemeContext.Provider>
  );
};
