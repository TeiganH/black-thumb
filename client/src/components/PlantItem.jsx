import React, { Component } from 'react';

// Same terinary form idea as create and update foods. This time we use a select drop down menu to show our flavors
class PlantItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdd: false
    }
  }

  render() {
    return (
      <div>
        
        {this.props.plantItem &&
          <div>
            <h1>{this.props.plantItem.name}</h1>
            <h2>{this.props.plantItem.scientific_name}</h2>
            {/* <div>{}</div> plant image  */}
            {/* <div>{}</div> plant description */}
            {/* Post MVP selector for plant condition for diagnosis.}


            {/* {this.props.plantItem.map(plant => (
              <div key={plant.id}>
                <p>{plant.name}</p>
              </div>
            ))} */}
            {this.state.isAdd
              ?
              <div>
                {/* The value and onChange function go on the select tag.
                    Then we map through our flavors as option tags within the select tag */}
                <select value={this.props.selectedPlant} onChange={this.props.handleChange}>
                  {this.props.plants.map(plant=>(
                    <option>{plant.name}</option>
                  ))}
                </select>
                <button onClick={() =>{
                  // addFlavorToFood takes the current food item and form data from app.js state to send to the API
                  this.props.addPlantToUser(this.props.plantItem)
                }}>Submit</button>
              </div>
              :
              <button onClick={() => {
                this.setState({
                  isAdd: true
                })
              }}>Add</button>
            }
          </div>
        }
      </div>
    )
  }
}

export default PlantItem;
