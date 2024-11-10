// import React, {
//   createContext,
//   useContext,
//   useState,
//   ReactNode,
//   useEffect,
// } from "react";
// // import { GoogleAuthProvider } from "firebase/auth";
// import {
//   signInWithPopup,
//   GoogleAuthProvider,
//   UserCredential,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   sendPasswordResetEmail,
//   signOut,
// } from "firebase/auth";
// import { auth, db, onAuthStateChanged } from "../firebaseConfig";
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   addDoc,
//   onSnapshot,
// } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";

// interface UserType {
//   uid: string;
//   name: string;
//   email: string;
//   image?: string;
//   authProvider?: string;
// }
// // Define the types for the context data
// interface AppContextType {
//   isAuthenticated: boolean;
//   setIsAuthenticated: (authenticated: boolean) => void;
//   user: any | null; // Change from `string | null` to `UserType | null`
//   setUser: (user: any | null) => void;
//   userData: UserType | null;
//   setUserData: (user: UserType | null) => void;
//   signInWithGoogle: () => Promise<boolean>;
//   loginWithUserEmailAndPassword: (
//     email: string,
//     password: string
//   ) => Promise<void>;
//   registerWithUserEmailAndPassword: (
//     name: string,
//     email: string,
//     password: string
//   ) => Promise<void>;
//   logoutToUser: () => Promise<void>;
// }

// // Create the context with a default value
// const AppContext = createContext<AppContextType | undefined>(undefined);

// // Define a provider component
// interface AppProviderProps {
//   children: ReactNode;
// }

// export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
//   const provider = new GoogleAuthProvider();
//   //   const navigate = useNavigate();
//   const collectionUserRef = collection(db, "users");

//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//   const [user, setUser] = useState<any | null>(null);
//   const [userData, setUserData] = useState<UserType | null>(null);

//   const signInWithGoogle = async (): Promise<boolean> => {
//     try {
//       const result: UserCredential = await signInWithPopup(auth, provider);
//       console.log("result", result);
//       const user = result.user; // This is the Firebase User object
//       const q = query(collectionUserRef, where("uid", "==", user.uid));
//       const doc = await getDocs(q);
//       if (doc?.docs?.length === 0) {
//         await addDoc(collectionUserRef, {
//           uid: user?.uid,
//           name: user?.displayName,
//           email: user?.email,
//           image: user?.photoURL,
//           authProvider: result?.providerId,
//         });
//       }
//       setIsAuthenticated(true);
//       return true;
//     } catch (error) {
//       console.error("Error signing in with Google:", error);
//       // Handle errors here
//       return false;
//     }
//   };

//   const loginWithUserEmailAndPassword = async (
//     email: string,
//     password: string
//   ) => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       // const result = await signInWithEmailAndPassword(auth, email, password);
//       // const user = result.user;
//       // await addDoc(collectionUserRef, {
//       //     uid: user?.uid,
//       //     name: user?.displayName,
//       //     email: user?.email,
//       //     providerId: "email/password",

//       //   });
//     } catch (error) {
//       console.error("Error signing:", error);
//     }
//   };

//   const registerWithUserEmailAndPassword = async (
//     name: string,
//     email: string,
//     password: string
//   ) => {
//     try {
//       const result = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const user = result.user;
//       await addDoc(collectionUserRef, {
//         uid: user?.uid,
//         name,
//         email: user?.email,
//         providerId: "email/password",
//       });
//     } catch (error) {
//       console.error("Error signing:", error);
//     }
//   };
//   const sendPasswordToUser = async (email: string) => {
//     try {
//       await sendPasswordResetEmail(auth, email);
//       alert("New Password send to user email");
//     } catch (error) {
//       console.error("Error signing:", error);
//     }
//   };

//   const logoutToUser = async () => {
//     await signOut(auth);
//   };

//   const userStateChanged = async () => {
//     onAuthStateChanged(auth, async (user) => {
//       if (user !== null) {
//         const q = query(collectionUserRef, where("uid", "==", user.uid));
//         await onSnapshot(q, (doc) => {
//           if (doc?.docs?.length > 0) {
//             setUserData(doc.docs[0].data() as UserType);
//           }
//         });
//         setUser(user);
//         console.log("Logged In");
//       } else {
//         console.log("Not logged in");
//         setUser(null);
//         // navigate("/login");
//       }
//     });
//   };

//   useEffect(() => {
//     userStateChanged();
//     if (user || userData) {
//       //   navigate("/");
//     } else {
//       //   navigate("/login");
//     }
//     return () => {
//       userStateChanged();
//     };
//   }, []);
//   return (
//     <AppContext.Provider
//       value={{
//         isAuthenticated,
//         setIsAuthenticated,
//         user,
//         setUser,
//         userData,
//         setUserData,
//         signInWithGoogle,
//         loginWithUserEmailAndPassword,
//         registerWithUserEmailAndPassword,
//         logoutToUser,
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };

// // Custom hook to use the context
// export const useAppContext = (): AppContextType => {
//   const context = useContext(AppContext);
//   if (!context) {
//     throw new Error("useAppContext must be used within an AppProvider");
//   }
//   return context;
// };

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { auth, db, onAuthStateChanged } from "../firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import Swal from "sweetalert2";

interface UserType {
  uid: string;
  name: string;
  email: string;
  image?: string;
  authProvider?: string;
}

// Define the types for the context data
interface AppContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (authenticated: boolean) => void;
  loading: boolean;
  isUserDataloading: boolean;
  //   setLoading: (loading: boolean) => void;
  user: any | null;
  setUser: (user: any | null) => void;
  userData: UserType | null;
  setUserData: (user: UserType | null) => void;
  signInWithGoogle: () => Promise<boolean>;
  loginWithUserEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<boolean>;
  registerWithUserEmailAndPassword: (
    name: string,
    email: string,
    password: string
  ) => Promise<boolean>;
  sendPasswordToUser: (email: string) => Promise<void>;
  registerWithGoogle: () => Promise<boolean>;
  logoutToUser: () => Promise<boolean>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Define a provider component
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const provider = new GoogleAuthProvider();
  const collectionUserRef = collection(db, "users");

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isUserDataloading, setIsUserDataloading] = useState<boolean>(false);
  const [user, setUser] = useState<any | null>(null);
  const [userData, setUserData] = useState<UserType | null>(null);

  const signInWithGoogle = async (): Promise<boolean> => {
    setLoading(true);
    try {
      const result: UserCredential = await signInWithPopup(auth, provider);
      const user = result.user;
      const q = query(collectionUserRef, where("uid", "==", user.uid));
      const doc = await getDocs(q);
      if (doc?.docs?.length === 0) {
        await addDoc(collectionUserRef, {
          uid: user?.uid,
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
          authProvider: result?.providerId,
        });
      }
      setIsAuthenticated(true);
      return true;
    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text: error || "Registration failed. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Error signing in with Google:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const loginWithUserEmailAndPassword = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true);
      return true;
    } catch (error: any) {
      console.error("Error signing in:", error);
      Swal.fire({
        title: "Error!",
        text: error || "Registration failed. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const registerWithUserEmailAndPassword = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = result.user;
      await addDoc(collectionUserRef, {
        uid: user?.uid,
        name,
        email: user?.email,
        providerId: "email/password",
      });
      setIsAuthenticated(true);
      return true;
    } catch (error: any) {
      console.error("Error signing up:", error);
      Swal.fire({
        title: "Error!",
        text: error || "Registration failed. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const sendPasswordToUser = async (email: string) => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      alert("New password sent to user email");
    } catch (error) {
      console.error("Error sending password reset:", error);
    } finally {
      setLoading(false);
    }
  };

  const logoutToUser = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setIsAuthenticated(false);
      setUser(null);
      setUserData(null);
      return true;
    } catch (error) {
      console.error("Error signing out:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const registerWithGoogle = async (): Promise<boolean> => {
    setLoading(true);
    try {
      const result: UserCredential = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if the user already exists in the Firestore
      const q = query(collectionUserRef, where("uid", "==", user.uid));
      const doc = await getDocs(q);

      if (doc?.docs?.length === 0) {
        // If the user doesn't exist, create a new user in Firestore
        await addDoc(collectionUserRef, {
          uid: user?.uid,
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
          authProvider: result?.providerId,
        });
      }

      setIsAuthenticated(true);
      return true;
    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text: error.message || "Registration failed. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Error signing up with Google:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const userStateChanged = async () => {
    setIsUserDataloading(true);
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(collectionUserRef, where("uid", "==", user.uid));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          setUserData(snapshot.docs[0].data() as UserType);
        }
        setUser(user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setUserData(null);
        setIsAuthenticated(false);
      }
      setIsUserDataloading(false);
    });
  };

  useEffect(() => {
    userStateChanged();
  }, []);

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        loading,
        isUserDataloading,
        setUser,
        userData,
        setUserData,
        signInWithGoogle,
        loginWithUserEmailAndPassword,
        registerWithUserEmailAndPassword,
        registerWithGoogle,
        sendPasswordToUser,
        logoutToUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
