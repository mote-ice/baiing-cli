import './style.scss'
import '@/layout/init'

import loading from '../../tools/loading-ts'

loading.start(null)

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

interface type_number {
    type: string
    value: number
}
interface type_string {
    type: string
    value: string
}
interface type {
    number: type_number
    string: type_string
}

console.info('TypeScript中的数据类型有：')

const variable: Array<any> = ['number', 'string']
const variable_type: type = {
    number: { type: '数值类型', value: 0 },
    string: { type: '字符串类型', value: 'Hello TS!' }
}

variable.forEach(item => {
    console.info(variable_type[item].type, variable_type[item])
})
