import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom'
import AuthForm from './components/AuthForm'
import './App.css';
import {withRouter} from 'react-router'
import decode from 'jwt-decode'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentUser: null,
      authForm: { username: '', email: '', password: ''},
      formData: {name: ''},
      plant: [],
    }
  }

  componentDidMount () {
    const token = localStorage.getItem("jwt")
    if (token) {
      const userData = decode(token)
      this.setState({
        currentUser: userData
      })
    }
  }

  handleFormChange(e) {
    this.setState({
      formData: {
        name: e.target.value
      }
    })
  }

  // ----------- calls for auth --------------

  handleAuthChange(e) {
    const {name, value} = e.target
    this.setState(prevState => (
      {
        authForm: {
          ...prevState.authForm,
          [name]: value
        }
      }
    ))
  }

  async handleRegister() {
    await registerUser(this.state.authForm)
    this.handleLogin()
  }

  async handleLogin(){
    const token = await loginUser(this.state.authForm)
    const userData = decode(token.jwt)
    this.setState({
      currentUser: userData
    })
    localStorage.setItem("jwt", token.jwt)
  }

  
  render(){
  return (
    <div className="App">
      <header>
        <Link to ='/'>
        <h1>Black Thumb</h1>
        </Link>
      </header>
      
    </div>
  );
}

}

export default withRouter(App)
