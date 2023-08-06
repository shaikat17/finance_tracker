import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { useLogOut } from "./useLogout";
import { useNavigate } from "react-router-dom";

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const auth = getAuth(app);

  const { dispatch } = useAuthContext()
  const { logOut } = useLogOut()
  const navigate = useNavigate()

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // console.log(user);
        // ...

        // update user profile
        updateProfile(user, {
          displayName: displayName,
        })
          .then(() => {
            // Profile updated!
            // ...
            console.log("Profile Updated.");

            // Loged out the user
            logOut()
            navigate('/login')
            
          })
          .catch((error) => {
            // An error occurred
            // ...
            console.log(error);
          });

        setIsPending(false);
        setError(null);
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        setError(errorMessage);
        setIsPending(false);
        // ..
      });
  };

  return { signup, error, isPending };
};
