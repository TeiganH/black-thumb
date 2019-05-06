import React, {Component} from 'react'
import {Route, Link} from 'react-router-dom'
import AuthForm from './components/AuthForm'
import './App.css';
import {withRouter} from 'react-router'
import {loginUser, registerUser, showPlants, showPlantItem, postPlant, putPlant, destroyPlant } from './services/api-helper'
import decode from 'jwt-decode'
// import Login from './components/Login'
// import Register from './components/Register'
import ShowPlants from './components/ShowPlants'
import PlantItem from './components/PlantItem'



class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      currentUser: null,
      plant: [],
      plantItem: [],
      formData: { name: '' },
      authForm: { email: '', password: ''}
    }
  

  //------ Bindings -------
  this.handleLoginButton = this.handleLoginButton.bind(this)
  this.getPlant = this.getPlant.bind(this)
  this.handleFormChange = this.handleFormChange.bind(this)
  this.handleAuthChange = this.handleAuthChange.bind(this)
  this.handleRegister = this.handleRegister.bind(this)
  this.handleLogin = this.handleLogin.bind(this)
  this.handleLogout = this.handleLogout.bind(this)
  this.getPlantItem = this.getPlantItem.bind(this)
  this.addPlant = this.addPlant.bind(this)
  this.updatePlant = this.updatePlant.bind(this)
  this.setPlantForm = this.setPlantForm.bind(this)
  this.deletePlant = this.deletePlant.bind(this)
  this.dropChange = this.dropChange.bind(this)
}

  handleLoginButton() {
    this.props.history.push("/login")
  }

  componentDidMount () {
    this.getPlant()
    const checkUser = localStorage.getItem("jwt")
    if (checkUser) {
      const user = decode(checkUser)
      this.setState({
        currentUser: user
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

  // code from https://codesandbox.io/s/w031p82nr5
  dropChange(e) {
    this.props.history.push(`${e.target.value}`)}

  // ----------- calls for auth --------------

  handleAuthChange(e) {
    const {name, value} = e.target
    this.setState(prevState => ({
        authForm: {
          ...prevState.authForm,
          [name]: value
        }
      }))
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

  handleLogout() {
    localStorage.clear()
    this.setState({
      currentUser: null
    })
  }

  //--------- Calls for data ------

  async getPlant() {
    const plant = await showPlants()
    this.setState({ plant })
  }

  async getPlantItem(id) {
    const plantItem = await showPlantItem(id)
    this.setState({ plantItem })
  }

  async addPlant() {
    const newPlant = await postPlant(this.state.formData)
    this.setState(prevState => ({
      plant: [...prevState.plant, newPlant],
      formData: {name: ''}
    }))
  }

  async updatePlant(plantItem) {
    const updatedPlantItem = await putPlant(plantItem.id, this.state.formData)
    this.setState(prevState => ({
      plant: prevState.plant.map(el => el.id === plantItem.id ? updatedPlantItem : el) 
    }))
  }

  setPlantForm(plantItem) {
    this.setState({
      formData: plantItem
    })
  }

  async deletePlant(plantItem) {
    await destroyPlant(plantItem.id)
    this.setState(prevState => ({
      plant: prevState.plant.filter(el => el.id !== plantItem.id)
    }))
  }

  
  render(){
    return (
      <div className="App">
        <header>
        
          <Link to ='/'><h1>Black Thumb</h1></Link>

          {this.state.currentUser 
            ?
            <div>
              <h3>Hi {this.state.currentUser.email}</h3>
              <button onClick={this.handleLogout}>Logout</button>
              {/* <Link to="/plants">View All Plants</Link> */}
            </div>
            : 
            <button onClick ={()=> this.props.history.push('/login')}>Login/Register</button>
          }

        </header>

        <Route exact path ="/login" render={()=>(
          <AuthForm
            authFormTitle="Login"
            handleSubmit={this.handleLogin}
            handleChange={this.handleAuthChange}
            authForm={this.state.authForm} />)} />

        <Route exact path="/register" render={()=>(
          <AuthForm 
            authFormTitle="Register"
            handleSubmit={this.handleRegister}
            handleChange={this.handleAuthChange}
            authForm={this.state.authForm} /> )} />
        <p></p>
        <Link to="/plants">Plants</Link>
        <hr></hr>

          <Route exact path="/plants" render={()=>(
            <ShowPlants
              plants={this.state.plant}
              getPlantItem={this.getPlantItem}
              handleSubmit={this.addPlant}
              handleChange={this.handleFormChange}
              updatePlant={this.updatePlant}
              formData={this.state.formData}
              setPlantForm={this.setPlantForm}
              deletePlant={this.deletePlant}
              dropChange={this.dropChange}
               /> )} />

          <Route path="/plants/:id" render={()=>(
            <PlantItem  
              plantItem={this.state.plantItem} /> )}/>
      </div>
    )
  }
}

export default withRouter(App)
