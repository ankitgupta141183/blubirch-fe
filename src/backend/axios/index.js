import axios from 'axios'
import { store } from './../../store'

const API_URL = 'http://localhost:3000'

const securedAxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

const plainAxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json'
  }
})

securedAxiosInstance.interceptors.request.use(config => {
  const method = config.method.toUpperCase()
  if (method !== 'OPTIONS') {
    config.headers = {
      ...config.headers,
      'Authorization': store.state.authorization,
      'Filter': store.state.current_warehouse

    }
  }
  return config
})

securedAxiosInstance.interceptors.response.use(null, error => {
  if (error.response && error.response.config && error.response.status === 401) {
    plainAxiosInstance.delete('/api/v1/logout')
      .then(response => {
        store.commit('unsetCurrentUser')
        location.replace('/')
      })
      .catch(error => {
        store.commit('unsetCurrentUser')
        location.replace('/')
        $toast.error('Error in updating distribution_center')
      })
  }
  else {
    return Promise.reject(error)
  }
})

export { securedAxiosInstance, plainAxiosInstance }
