import React from 'react'
import { Link } from 'react-router-dom'

export default function AuthForm(props) {
  const {authForm, handleChange, handleSubmit, authFormTitle} = props
    return (
    <div>
      <h1>{authFormTitle}</h1>
      <form onSubmit={(e)=>{
        e.preventDefault()
        handleSubmit()
      }}>
        Username: <input autoComplete="username" name="username" type="text" value={authForm.username} onChange={handleChange} />&nbsp;
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

