const httpDefaultConfig = {
  baseURL: '/api',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true,
  timeout: 5000
}

export default httpDefaultConfig