import React from 'react'
import { Link } from 'react-router-dom'

export default function AuthForm(props) {
  const {authForm, handleChange, handleSubmit, authFormTitle} = props
    return (
    <div className="authform">
      <h2>{authFormTitle}</h2>
      <form onSubmit={(e)=>{
        e.preventDefault()
        handleSubmit()
        // updateUser()
      }}>
        Email: <input autoComplete="email" name="email" type="email" value={authForm.email} onChange={handleChange} />&nbsp;
        Password: <input autoComplete="current-password" name="password" type="password" value={authForm.password} onChange={handleChange}/>
        <button>Submit</button>
      </form>
  
      { 
       
        authFormTitle === "Login" 
        && 
        
        <Link to="/register">Register</Link>
        
     }

    </div>
  )
}

