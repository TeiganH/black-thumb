import React from 'react'

const AllPlants = (props) => 
<>
<br />
{props.allPlants.map(plant => 
    <div key={plant.id}>
        <div>{plant.name}</div>
        <div>{plant.scientific_name}</div>
        <div>{plant.description}</div>
    </div>
)}
</>  

export default AllPlants