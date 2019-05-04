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

export const putPlant = (id, item) => {
  const opts = {
    method: 'PUT',
    body: JSON.stringify(item),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  }
  return fetch(`$baseURL}/foods/${id}`, opts)
    .then(resp => resp.json())
    .catch(e => e)
}

export const destroyPlant = (id) => {
	const opts = {
		method: 'DELETE',
		headers: {
			'Authorization': `Bearer ${localStorage.getItem('jwt')}`
		}
	}
	return fetch(`${baseURL}/plants/${id}`, opts)
		.catch(e => e)
}

export const loginUser = (loginData) => {
	const opts = {
		method: 'POST',
		body: JSON.stringify({auth: loginData}),
		headers: {
			'Content-Type': `application/json`,
		}
	}
	return fetch(`${baseURL}/user_token`, opts)
		.then(resp => resp.json())
		.catch(e => e)
}

