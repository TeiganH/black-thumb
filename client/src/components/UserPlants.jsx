import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class UserPlants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdd: false,
    }
  }
  render() {
    console.log( this.props.currentUser.sub)
    return (
      <div>
        {this.props.userPlants.map(plant => (
          <div key={plant.id}>
            <div>
              <a
                onClick={() => {
                  this.props.getUserOnePlant(plant.id)
                  this.props.history.push(`users/${this.props.currentUser.sub}/plants/${plant.id}`)
                  }}>
                    {plant.name}
              </a>
              {this.props.userPlant&&plant.id==this.props.userPlant.id?(<div>
                <p>{this.props.userPlant.description}</p>
              </div>):null}<div>

              </div>
                <p>
                  {/* <button 
                    onClick={() => { 
                      this.props.deletePlant(plant) }}>
                      Delete
                  </button> */}
                </p>
              </div>
          </div>
        ))}
      </div>
    )
  }
}

export default withRouter(UserPlants);

