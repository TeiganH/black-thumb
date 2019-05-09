import React from 'react'

const AllPlants = (props) => 
<div className="allplants">
<br />
{props.allPlants.map(plant => 
    <div className="plant-container" key={plant.id}>
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
    </div>
)}
</div>  

export default AllPlants