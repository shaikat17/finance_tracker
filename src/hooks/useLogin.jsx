import { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { Navigate, useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const auth = getAuth(app);

  const { dispatch, setLoading } = useAuthContext()

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // console.log(user);
        // ...
        dispatch({type: "LOGIN", payload: user});

        console.log("login");
        setLoading(false)
        navigate("/")
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

  return { login, error, isPending };
};
