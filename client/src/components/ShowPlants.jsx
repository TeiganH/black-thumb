import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DropDown from './DropDown'


// I wanted to show a different style of doing forms in this component
// I used terinaries to show in-line edit forms in place the mapped food item.
// Additionally there is another terinary for the add food item form. In a more complicated app, we would probably make this a seperate component.
class ShowPlants extends Component {
  constructor(props) {
    super(props);
    // We set two boolean values in state to check if the forms should be shown
    this.state = {
      isAdd: false,
      isEdit: false
    }
  }
  render() {
    return (
      <div>
        {this.props.plants.map(plant => (
          <div key={plant.id}>
            {/* Here is where we user a terinary for the edit form.
              If the isEdit in state is set to the current food id, then we show an edit form for just that item */}
            {this.state.isEdit === plant.id
              ?
              <div>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  this.props.updatePlant(plant);
                  this.setState({
                    isEdit: false
                  })}}>

                  <input
                    name="name"
                    type="text"
                    value={this.props.formData.name}
                    onChange={this.props.handleFormChange} 
                  />
                  <button>Submit</button>
                </form>
              </div>
              :
              // When the isEdit does not equal the current food id, display the food info like normal
              // This inludes the food name inside a link, and edit button and delete button
              <div>
                <Link to={`/plants/${plant.id}`} onClick={() => { this.props.getPlantItem(plant.id) }}>{plant.name}</Link>
                <p>
                <button onClick={() => {
                  // the edit form data is preset using the setFoodForm function and the current foods data 
                  this.props.setPlantForm(plant);
                  // then we set isEdit in state to the current foods id
                  this.setState({
                    isEdit: plant.id
                  })
                }}>Edit
                </button>&nbsp;
                <button onClick={() => { this.props.deletePlant(plant) }}>Delete</button>
                </p>
              </div>
            }
          </div>
        ))}
        {/* incase you haven't seen it, <hr /> just makes an horizontle rule (or line) accross the page */}
        <hr />
        {this.state.isAdd // Same setup as before but since there will only ever be one add form, a simple true/false boolean will work
          ?
          // When the 'Add' button is clicked, a create food form is shown.
          // When the 'Submit' button is clicked, when ship the data to our API and reset the form back to a button
          <div>
            <form onSubmit={(e) => {
              e.preventDefault();
              this.props.handleSubmit();
              this.setState({ isAdd: false })}}>
              <>
                {/* code from https://codesandbox.io/s/w031p82nr5 */}
                  <DropDown dropChange={this.props.dropChange} formData={this.props.formData}/>
     

                <button>Submit</button>
              </>
            </form>
          </div>
          :
          <button onClick={() => {
            this.setState({ isAdd: true })
          }}>Add Plant</button>
        }
      </div>
    )
  }
}

export default ShowPlants;

