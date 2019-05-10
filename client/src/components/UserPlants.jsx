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
                    <div className="plantname">{plant.name}</div>
              </Link>
              &nbsp;&nbsp;&nbsp;

                {this.props.userPlant&&plant.id===this.props.userPlant.id
                ?
                (<div className="user-plant-container" key={plant.id}>
                <div className="left-container">
                    <div className="left-content">
                        <img src={plant.plant_image} />
                    </div>
                </div>
                <div className="right-container">
                    <div className="right-content">
                        <div className="plantname">{plant.name}</div>
                        <hr />
                        <div className="plantscience">{plant.scientific_name}</div>
                        <br />
                        <div className="plantdescription">{plant.description}</div>
                        <br />
                    </div>
                </div>

                <p></p>
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


