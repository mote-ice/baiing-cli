import axios from 'axios';

const service = axios.create() // 创建实例


// 添加request拦截器
service.interceptors.request.use(config => {
    config.timeout = 10000;
    if (config.url.indexOf('oauth/login') !== -1) {
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        config.transformRequest = (data) => {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
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
}, err => {
    if (err && err.response) {
        switch (err.response.status) {
            case 404:
                console.info('没有找到请求地址!');
                break;
            case 500:
                console.info('数据请求异常,请重试!');
                break;
            default:
                console.info('数据请求异常!');
                return Promise.reject(err);
        }
    }
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