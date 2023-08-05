import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useLogOut } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logOut } = useLogOut();

  const { user } = useAuthContext()

  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}>
          <Link to="/">My Money</Link>
        </li>

        {!user && <>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        </>}

        {user && 
        <>
        <li>Hello, {user?.displayName}</li>
        <li>
            <button className="btn" onClick={logOut}>Logout</button>
        </li>
        </>
        }
      </ul>
    </nav>
  );
};

export default Navbar;
