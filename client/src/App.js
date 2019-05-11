import React, {Component} from 'react'
import {Route, Link} from 'react-router-dom'
import AuthForm from './components/AuthForm'
import './App.css';
import {withRouter} from 'react-router'
import {loginUser, registerUser, showPlants, showPlantItem, showUserOnePlant, addUserPlant, showUserPlants, destroyUser, putUser } from './services/api-helper'
import decode from 'jwt-decode'
import UserPlants from './components/UserPlants'
import AllPlants from './components/AllPlants'
// import PlantItem from './components/PlantItem'
import DropDown from './components/DropDown'
import UpdateForm from './components/UpdateForm'
import LinkButton from './components/LinkButton'

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      currentUser: null,
      allPlants: [],
      plants: [],
      userPlants: [],
      plantItem: null,
      userPlant: null,
      formData: { name: '' },
      authForm: { email: '', password: ''},
      selectedPlant: "Parlor Palm"
    }
  

  //------ Bindings -------
  this.handleLoginButton = this.handleLoginButton.bind(this)
  this.getPlant = this.getPlant.bind(this)
  this.getPlantItem = this.getPlantItem.bind(this)
  // this.addPlant = this.addPlant.bind(this)
  // this.updatePlant = this.updatePlant.bind(this)
  this.handleLogin = this.handleLogin.bind(this)
  this.handleLogout = this.handleLogout.bind(this)
  this.handleRegister = this.handleRegister.bind(this)
  this.handleAuthChange = this.handleAuthChange.bind(this)
  this.handleFormChange = this.handleFormChange.bind(this)
  this.setPlantForm = this.setPlantForm.bind(this)
  this.plantForm = this.plantForm.bind(this)
  this.addPlantToUser = this.addPlantToUser.bind(this)
  this.getUserPlants = this.getUserPlants.bind(this)
  this.getUserOnePlant = this.getUserOnePlant.bind(this)
  this.deleteUser = this.deleteUser.bind(this)
  this.handleUpdate = this.handleUpdate.bind(this)
  // this.removePlantFromUser = this.removePlantFromUser.bind(this)
}

  handleLoginButton() {
    this.props.history.push("/login")
  }

  componentDidMount () {
    this.getPlant()
    const checkUser = localStorage.getItem("jwt")
    if (checkUser) {
      const user = decode(checkUser)
      this.getUserPlants(user.sub)
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

  handleUpdateChange(e) {
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
    this.getUserPlants(userData.sub)
    this.setState({
      currentUser: userData
    })
    localStorage.setItem("jwt", token.jwt)
  }

  async handleUpdate(currentUser) {
    const userData = await putUser(this.state.currentUser.sub, this.state.authForm)
    this.setState({
      currentUser: userData 
  })}

  handleLogout() {
    localStorage.clear()
    this.setState({
      currentUser: null
    })
  }

  async deleteUser(currentUser) {
    await destroyUser(this.state.currentUser.sub)
    this.handleLogout()
    }
  //--------- Calls for data ------

  async getPlant() {
    const allPlants = await showPlants()
    this.setState({ allPlants })
  }

  async getPlantItem(id) {
    const plantItem = await showPlantItem(id)
    this.setState({ plantItem })
  }

  async getUserOnePlant(plant_id) {
    const userPlant = await showUserOnePlant(this.state.currentUser.id, plant_id);
    this.setState({userPlant})
  }
  
  async getUserPlants(userId) {
    const saveUserPlant = await showUserPlants(userId)
    this.setState({
      userPlants: saveUserPlant
    })
  }

    async addPlantToUser() {
      const newPlant = this.state.allPlants.find(plant => plant.name === this.state.selectedPlant)
      const newPlantItem = await addUserPlant(this.state.currentUser.sub, newPlant.id)
      if (newPlantItem){
        this.setState(prevState=>({
          userPlants:  [...prevState.userPlants, newPlantItem]
        }))
      }
    }


  setPlantForm(plantItem) {
    this.setState({
      formData: plantItem
    })
  }


  plantForm(e) {
    this.setState({
      selectedPlant: e.target.value
    })
  }
  
  render(){
    return (
      <div className="App">
        <header>

          <button className="login" onClick={()=> this.props.history.push('/login')}>
            Login/Register
          </button>

          <h1>
            <Link to ='/'>Black Thumb</Link>
          </h1>

          <Route exact path ="/login" render={()=>(
          <AuthForm
            authFormTitle="Login"
            handleSubmit={this.handleLogin}
            handleChange={this.handleAuthChange}
            authForm={this.state.authForm} />)} 
          /> 

        <Route exact path="/register" render={()=>(
          <AuthForm 
            authFormTitle="Register"
            handleSubmit={this.handleRegister}
            handleChange={this.handleAuthChange}
            authForm={this.state.authForm} /> )} />

        <Route exact path="/update" render={()=>(
          <UpdateForm
            updateFormTitle="Update"
            handleSubmit={this.handleUpdate}
            handleChange={this.handleAuthChange}
            authForm={this.state.authForm} />)} />
          

          {this.state.currentUser &&
              
              <div>
                <h3>Hi {this.state.currentUser.email}</h3>
                <div className="userbuttons">
                  <button onClick={this.deleteUser}>Delete Yo'Self!</button>
                  <LinkButton to="/update">Update</LinkButton>
                  <button onClick={this.handleLogout}>Logout</button>
                </div>
                <h3>Your plants</h3>
                <br /><br />
              
                <div className="user-plant-container">
                
                <UserPlants 
                  plants={this.state.plants}
                  userPlant={this.state.userPlant}
                  formData={this.state.formData}
                  getPlantItem={this.getPlantItem}
                  deletePlant={this.deletePlant}
                  handleSubmit={this.addPlant}
                  handleChange={this.handleFormChange}
                  setPlantForm={this.setPlantForm}
                  updatePlant={this.updatePlant}
                  userPlants={this.state.userPlants}
                  getUserOnePlant={this.getUserOnePlant}
                  currentUser={this.state.currentUser}
                  // removePlantFromUser={this.removePlantFromUser}
                />

                <DropDown 
                  plantItem={this.state.plantItem}
                  selectedPlant={this.state.selectedPlant}
                  handleChange={this.plantForm}
                  addPlantToUser={this.addPlantToUser}
                  allPlants={this.state.allPlants} /> 
                </div>
              </div>
          }

        </header>
        
        <h4><Link className="allplantslink" to="/plants">View All Plants</Link></h4>
        <Route exact path="/plants" render={()=>(
            <AllPlants 
              allPlants={this.state.allPlants}/>
            )} />


      </div>
      
    )
  }
}
        



export default withRouter(App)
