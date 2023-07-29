import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogOut = () => {
  const auth = getAuth(app);
  const { dispatch } = useAuthContext()
   
  const logOut = () => {
    signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("Log Out")
      
    //   dispatch action
    dispatch({type: "LOGOUT"})
    })
    .catch((error) => {
      // An error happened.
      console.log(error)
    });
  }

  return { logOut }
};
