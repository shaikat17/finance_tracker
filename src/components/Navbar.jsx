import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useLogOut } from "../hooks/useLogout";

const Navbar = () => {
  const { logOut } = useLogOut();
  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}>
          <Link to="/">My Money</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
            <button className="btn" onClick={logOut}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
