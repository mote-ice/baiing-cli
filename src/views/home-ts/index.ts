import './style.scss'
import '@/layout/init'

let title: any = document.getElementById('title')
let setData: any = document.getElementById('setData')

setData.oninput = function() {
    title.innerHTML = setData.value
}

Object.defineProperty(setData, 'val', {
    get: function() {
        return this.value
    },
    set: function(str) {
        this.value = str
        title.innerHTML = str
    }
})
