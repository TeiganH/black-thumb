const baseURL = "http://localhost:3000"

export const showPlants = () => {
  return fetch(`${baseURL}/plants`)
    .then(resp => resp.json())
    .catch(e =>e)
}

