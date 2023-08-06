// styles
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import styles from "./Home.module.css";

// components
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import { useEffect, useState } from "react";


export default function Home() {
  const { user } = useAuthContext();
  const [selectedOption, setSelectedOption] = useState("asc");
  // const [documents, setDocuments] = useState([])
  // const [error, setError] = useState('')

  const { documents, error } = useCollection("transactions", ["uid", "==", user.uid], ["amount", selectedOption]);

  // Function to handle the change event
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    console.log(selectedOption);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className="container">
          <div className="select">
            <label htmlFor="order">Order By: </label>
            <select
              name="order"
              id="order"
              value={selectedOption}
              onChange={handleOptionChange}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
        {error && <p>{error}</p>}
        {documents && <TransactionList transactions={documents} />}
      </div>
      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid} />
      </div>
    </div>
  );
}
