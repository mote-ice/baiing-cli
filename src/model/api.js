import http from './http.js'

const api = {
    login(param) {
        return http.post('/api/oauth/login', param)
    },
}

export default api
