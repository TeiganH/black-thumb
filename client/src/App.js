import React, {Component} from 'react'
import {Route, Link} from 'react-router-dom'
import AuthForm from './components/AuthForm'
import './App.css';
import {withRouter} from 'react-router'
import {loginUser, registerUser, showPlants, showPlantItem, showUserOnePlant, postPlant, putPlant, putUserPlant, showUserPlants } from './services/api-helper'
import decode from 'jwt-decode'
import UserPlants from './components/UserPlants'
import AllPlants from './components/AllPlants'
// import PlantItem from './components/PlantItem'
import DropDown from './components/DropDown'


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
  this.addPlant = this.addPlant.bind(this)
  this.updatePlant = this.updatePlant.bind(this)
  // this.deletePlant = this.deletePlant.bind(this)
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

  handleLogout() {
    localStorage.clear()
    this.setState({
      currentUser: null
    })
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
      const newUserItem = await putUserPlant(this.state.currentUser.sub, newPlant.id)
      this.setState({
        plants: newUserItem
      })
    }

  async addPlant() {
    const newPlant = await postPlant(this.state.formData)
    this.setState(prevState => ({
      plants: [...prevState.plant, newPlant],
      formData: {name: ''}
    }))
  }

  async updatePlant(plantItem) {
    const updatedPlantItem = await putPlant(plantItem.id, this.state.formData)
    this.setState(prevState => ({
      plants: prevState.plant.map(el => el.id === plantItem.id ? updatedPlantItem : el) 
    }))
  }

  setPlantForm(plantItem) {
    this.setState({
      formData: plantItem
    })
  }

  // async deletePlant(plantItem) {
  //   await destroyPlant(plantItem.id)
  //   this.setState(prevState => ({
  //     plants: prevState.plant.filter(el => el.id !== plantItem.id)
  //   }))
  // }



  plantForm(e) {
    this.setState({
      selectedPlant: e.target.value
    })
  }
  
  render(){
    return (
      <div className="App">
        <header>
        <button onClick ={()=> this.props.history.push('/login')}>Login/Register</button>
          <Link to ='/'><h1>Black Thumb</h1></Link>
          <>
              <br /><br />
              <Link to="/plants">View All Plants</Link>
              <Route exact path="/plants" render={()=>(
                  <AllPlants 
                    allPlants={this.state.allPlants}
                  />
                  )} />
              </>

          {this.state.currentUser &&
            
              <div>
                <h3>Hi {this.state.currentUser.email}</h3>
                
                <button onClick={this.handleLogout}>Logout</button>
                <br /><br />
                {/* <Link to="/u">View All Plants</Link>
                &nbsp; */}
                <hr />
                Your plants
                <br /><br />
                {/* <Route exact path="/plants" render={()=>( */}
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
                     />


                <DropDown 
                  plantItem={this.state.plantItem}
                  selectedPlant={this.state.selectedPlant}
                  handleChange={this.plantForm}
                  addPlantToUser={this.addPlantToUser}
                  allPlants={this.state.allPlants} /> 
                  
                  </div>
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
            
      </div>
    )
  }
}

export default withRouter(App)
