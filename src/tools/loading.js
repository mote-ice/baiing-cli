import loadimg from '@/assets/images/Loading.png';

const loading = {
    element() {
        return `<div class="loading-container">
            <img class="rotate" src="${loadimg}">
            </div>`
    },
    start(el) {
        $(el || 'body').css('position', 'relative');
        $(el || 'body').append($(this.element()));
    },
    stop(el) {
        $(el || 'body').css('position', 'unset');
        $(el || 'body').find('.loading-container').remove();
    }
};

export default loading;