const baseURL = "http://localhost:3000"

export const showPlants = () => {
  return fetch(`${baseURL}/plants`)
    .then(resp => resp.json())
    .catch(e =>e)
}

export const showPlantItem = (id) => {
  return fetch(`${baseURL}/plants/${id}`)
    .then(resp => resp.json())
    .catch(e => e)
}

export const postPlant = (item) => {
  const opts = {
    method: 'POST',
    body: JSON.stringify(item),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  }
  return fetch(`${baseURL}/foods/`, opts)
    .then(resp => resp.json())
    .catch(e =>e)
}

