import http from './http.js'

const login = param => {
    return http.post('/api/oauth/login', param)
}

export default { login }
