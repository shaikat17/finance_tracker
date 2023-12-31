import { useState } from 'react'

// styles
import styles from './Signup.module.css'
import { useSignUp } from '../../hooks/useSignUp'
import { Link } from 'react-router-dom'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const { signup, isPending, error } = useSignUp()

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(email, password, displayName)
    signup(email, password, displayName)
    setEmail("")
    setPassword("")
    setDisplayName("")

  }

  return (
    <>
    <form onSubmit={handleSubmit} className={styles['signup-form']}>
      <h2>Sign up</h2>
      <label>
        <span>Email:</span>
        <input 
          type="email" 
          onChange={(e) => setEmail(e.target.value)} 
          value={email}
        />
      </label>
      <label>
        <span>Password:</span>
        <input 
          type="password" 
          onChange={(e) => setPassword(e.target.value)} 
          value={password} 
        />
      </label>
      <label>
        <span>Display Name:</span>
        <input 
          type="text" 
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      {!isPending && <button className="btn">Sign up</button>}
      {isPending && <button className='btn' disabled>Loading</button>}
      { error && <p>{error}</p>}
    </form>
    <p className={styles.message_box}>Already have an account? <Link to="/login">Login</Link> </p>
    </>
  )
}