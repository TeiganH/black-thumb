import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class UserPlants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
    }
  }
  render() {
    return (
      <div>
        {this.props.userPlants.map(plant => ( 
          <div key={plant.id}>
            <div>
              <Link to={`/users/${this.props.currentUser.sub}/plants/${plant.id}`} 
                onClick={() => 
                  {this.props.getUserOnePlant(plant.id)
                  this.props.history.push(`users/${this.props.currentUser.sub}/plants/${plant.id}`)
                  }}>
                    {plant.name}
              </Link>
              &nbsp;&nbsp;&nbsp;
              



              <Link to={`/users/${this.props.currentUser.sub}/plants/${plant.id}`}
                onClick={()=>
                  {this.props.removePlantFromUser(plant.id)
                  // this.props.history.push(`users/${this.props.curentUser.sub}/plants`)
                }}>
                  Delete
              </Link>  





                {this.props.userPlant&&plant.id===this.props.userPlant.id
                ?
                (<div>
                    <p>{this.props.userPlant.description}</p>
                  </div>)
                :
                null}
              </div>
          </div>
        ))}
      </div>
    )
  }
}

export default withRouter(UserPlants);

