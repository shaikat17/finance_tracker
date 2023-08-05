import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import {BounceLoader} from "react-spinners";


const ProtectedRoute = ({children}) => {
    const {user, loading} = useAuthContext()
    const {authIsReady} = useAuthContext()
    const navigate = useNavigate();

    if(loading) return (
        <div className="loading-container">
        <BounceLoader color="#36d7b7" />
        </div>
    )

    if (!user) {
        navigate("/login");
        return null; // or a different component to render when user is not authenticated
      }

    return children
};

export default ProtectedRoute;