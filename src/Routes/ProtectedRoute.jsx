import { useAuthContext } from "../hooks/useAuthContext";


const ProtectedRoute = ({children}) => {
    const {authIsReady} = useAuthContext()
    
    if(authIsReady) return children
};

export default ProtectedRoute;