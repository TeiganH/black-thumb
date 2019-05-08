import React, { Component} from 'react'


class DropDown extends Component {
  constructor(props) {
    super(props)
    this.state = { isAdd: false}
  }
  
  render () {
    return (
      <div>
        {
          this.props.allPlants
         &&
          <div>
            {this.state.isAdd 
              ?
                <div> 
                  <select value={this.props.selectedPlant} onChange={this.props.handleChange}>
                    {this.props.allPlants.map(plant => (
                      <option key={plant.id}>{plant.name}</option>
                    ))}
                  </select>
                  <button onClick={() => {
                    this.props.addPlantToUser(this.props.selectedPlant)
                  }}>Submit</button>
                </div>
              :
                <button onClick={() => {
                  this.setState({isAdd: true})
                }}>Add</button>
            }
          </div>
        }
      </div>
    )
  }
}


export default DropDown
        
            
    


    