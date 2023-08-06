import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useReducer, useState } from "react";
import { app } from "../firebase/config";

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN':
            return {...state, user: action.payload }
        case 'LOGOUT':
            return {...state, user: null, authIsReady: false}
        case 'AUTH_IS_READY':
            return {...state, user: action.payload, authIsReady: true}

        default: 
            return state
    }
}

export const AuthContextProvider = ({children}) => {
    const [loading, setLoading] = useState(true)
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
            //   console.log(user)
              setLoading(false)
              dispatch({type: 'AUTH_IS_READY', payload: user});
              // ...
            } else {
              // User is signed out
              // ...
              setLoading(false)
            }
          });

          return () => {
            unsubscribe()
          }
    }, [])

    // console.log('Auth State: ', state)
    return (
        <AuthContext.Provider value={{...state, dispatch, loading, setLoading}}>
            {children}
        </AuthContext.Provider>
    )
}