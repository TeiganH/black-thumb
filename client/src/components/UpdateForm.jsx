import React from 'react'

export default function UpdateForm(props) {
  const {handleChange, handleSubmit, authForm, updateFormTitle} = props
    return (
      <div className="authform">
      <h2>{updateFormTitle}</h2>
      <form onSubmit={(e)=>{
        e.preventDefault()
        handleSubmit()

      }}>
        Email: 
        <input autoComplete="email" name="email" type="email" value={authForm.email} onChange={handleChange} />&nbsp;
        Password: 
        <input autoComplete="current-password" name="password" type="password" value={authForm.password} onChange={handleChange}/>
        <button>Submit</button>
      </form>
      { 
        updateFormTitle === "Update" 
      }
    </div>
  )
}

