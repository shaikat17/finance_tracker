// styles
import { useAuthContext } from '../../hooks/useAuthContext'
import styles from './Home.module.css'

// components
import TransactionForm from './TransactionForm'
import { useCollection } from '../../hooks/useCollection'

export default function Home() {
  const { user } = useAuthContext()
  const { documents, error} = useCollection('transactions')
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        Transaction List
      </div>
      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid}/>
      </div>
    </div>
  )
}