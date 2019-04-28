import './style.scss';
import 'jquery.cookie';

import tool from 'assets/tools/test';

$.cookie('name', 'userName');
console.dir(tool);

document.getElementById('btn').onclick = function() {
    var element = document.getElementById('img');

    if (element.style.animationPlayState === 'paused') {
        this.innerHTML = '暂停';
        element.style.setProperty('animation-play-state', 'running', 'important');
    } else {
        this.innerHTML = '开始';
        element.style.setProperty('animation-play-state', 'paused', 'important');
    }
}