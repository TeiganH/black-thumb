const baseURL = "https://black-thumb.herokuapp.com"


// ------- Plant API Helpers---------

// ----- Show All Plants--------
export const showPlants = () => {
  return fetch(`${baseURL}/plants`)
    .then(resp => {
      return resp.json()
    })
    .catch(e => console.log(e))
}

// ------ Show one Plant -------
export const showPlantItem = (id) => {
  return fetch(`${baseURL}/plants/${id}`)
    .then(resp => resp.json())
    .catch(e => console.log(e))
}

// ------- User/Plant connection api helper  ------

// ------ Give user plant ------
export const addUserPlant = (user_id, id) => {
  const opts = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  }
  return fetch(`${baseURL}/users/${user_id}/plants/${id}`, opts)
  .then(resp => resp.json())
  .catch(e =>e)
}



//----- Show User's plants ------
export const showUserPlants = (user_id) => {
  return fetch(`${baseURL}/users/${user_id}/plants`)
    .then(resp => resp.json())
    .catch(e =>e)
}

// ----- Show only one plant of user -------
export const showUserOnePlant = (user_id, id) => {
  return fetch(`${baseURL}/users/${user_id}/plants/${id}`)
    .then(resp => resp.json())
    .catch(e => e)
}


//// -----------User api --------

// ------ Login/Show user ------
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

//------ create user-------

export const registerUser = (registerData) => {
	const opts= {
		method: 'POST',
		body: JSON.stringify({ user: registerData}),
		headers: {
			'Content-Type': 'application/json'
		}
	}
	return fetch(`${baseURL}/users`, opts)
		.then(resp => resp.json())
		.catch(e => e)
}

// -------- Update User  -------
export const putUser = (id, item) => {
  const opts = {
    method: 'PUT',
    body: JSON.stringify(item),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  }
  return fetch(`${baseURL}/users/${id}`, opts)
    .then(resp => resp.json())
    .catch(e => e)
}

// --------delete user ----------
export const destroyUser = (id) => {
  	const opts = {
  		method: 'DELETE',
  		headers: {
  			'Authorization': `Bearer ${localStorage.getItem('jwt')}`
  		}
  	}
  	return fetch(`${baseURL}/users/${id}`, opts)
  		.catch(e => e)
  }
