import axios from 'axios';

const service = axios.create(); // 创建实例


// 添加request拦截器
service.interceptors.request.use(config => {
    config.timeout = 10000;
    if (config.url.indexOf('oauth/login') !== -1) {
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        config.transformRequest = (data) => {
            let ret = ''
            for (let key in data) {
                ret += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&'
            }
            return ret;
        }
    } else {
        config.headers['Authorization'] = $.cookie('Authorization') || '';
    };
    return config;
}, error => Promise.reject(error));

// 添加respone拦截器
service.interceptors.response.use(res => {
    if (res.status === 200 || res.status === '200') {
        switch (res.data.code) {
            case '4000':
                console.info('本网站需要登录账户!');
                break;
            case '4003':
                console.info('登录失效!');
                break;
            default:
                return res.data;
        }
    }
}, error => {
    if (error && error.response) {
        switch (error.response.status) {
            case 400:
                error.message = '错误请求'
                break
            case 401:
                error.message = '未授权，请重新登录'
                break
            case 403:
                error.message = '拒绝访问'
                break
            case 404:
                error.message = '请求错误,未找到该资源'
                break
            case 405:
                error.message = '请求方法未允许'
                break
            case 408:
                error.message = '请求超时'
                break
            case 500:
                error.message = '服务器端异常'
                break
            case 501:
                error.message = '网络未实现'
                break
            case 502:
                error.message = '网络错误'
                break
            case 503:
                error.message = '服务不可用'
                break
            case 504:
                error.message = '网络超时'
                break
            case 505:
                error.message = 'http版本不支持该请求'
                break
            default:
                error.message = `连接错误${error.response.status}`
        }
    } else {
        error.message = '链接服务器失败'
    }
    return Promise.reject(error)

});

export default {
    get(url, params) {
        return new Promise((resolve, reject) => {
            service({ method: 'get', url, params })
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    },
    post(url, data) {
        return new Promise((resolve, reject) => {
            service({ method: 'post', url, data })
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    }
}