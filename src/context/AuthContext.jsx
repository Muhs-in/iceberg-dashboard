// // AuthContext.js
// import { createContext, useState, useEffect } from 'react';
// import axios from 'axios';

// // Create a new context
// export const AuthContext = createContext();

// // The provider component
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/auth/getUser', {
//           withCredentials: true, // Include cookies in the request
//         });
//         setUser(response.data.user); // Store the user in context
//       } catch (error) {
//         console.error('Error fetching user:', error);
//       }
//     };

//     fetchUser();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/auth/status', {
        withCredentials: true
      });
      console.log('Auth response:', response.data);
      if (response.data.isAuthenticated) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.get('http://localhost:3000/api/auth/logout', {
        withCredentials: true
      });
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);