import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useReducer } from "react";
import { app } from "../firebase/config";

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN':
            return {...state, user: action.payload}
        case 'LOGOUT':
            return {...state, user: null}
        case 'AUTH_IS_READY':
            return {...state, user: action.payload, authIsReady: true}

        default: 
            return state
    }
}

export const AuthContextProvider = ({children}) => {
    const auth = getAuth(app);

    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authIsReady: false
    })

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/auth.user
              const uid = user.uid;
              dispatch({type: 'AUTH_IS_READY', payload: user})
              // ...
            } else {
              // User is signed out
              // ...
            }
          });

          return () => {
            unsubscribe()
          }
    }, [])

    console.log('Auth State: ', state)
    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}