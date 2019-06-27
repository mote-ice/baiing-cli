const loading = {
    element(size) {
        return `
            <div class="loading-container">
                <div class="loading-content" style="width: ${size}px; height: ${size}px">
                    <div class="loading-item" style="border-radius: ${size <= 30 ? 50 : 0}%;"></div>
                    <div class="loading-item" style="border-radius: ${size <= 30 ? 50 : 0}%;"></div>
                    <div class="loading-item" style="border-radius: ${size <= 30 ? 50 : 0}%;"></div>
                    <div class="loading-item" style="border-radius: ${size <= 30 ? 50 : 0}%;"></div>
                    <div class="loading-item" style="border-radius: ${size <= 30 ? 50 : 0}%;"></div>
                    <div class="loading-item" style="border-radius: ${size <= 30 ? 50 : 0}%;"></div>
                    <div class="loading-item" style="border-radius: ${size <= 30 ? 50 : 0}%;"></div>
                    <div class="loading-item" style="border-radius: ${size <= 30 ? 50 : 0}%;"></div>
                    <div class="loading-item" style="border-radius: ${size <= 30 ? 50 : 0}%;"></div>
                </div>
            </div>
        `
    },
    size(el) {
        let size = 40
        if (el) {
            let width = $(el).outerWidth(),
                height = $(el).outerHeight(),
                WH = width - height >= 0 ? height : width
            if (WH < 40) size = 20
        }
        return size
    },
    start(el) {
        $(el || 'body').css('position', 'relative')
        $(el || 'body').append($(this.element(this.size(el))))
    },
    stop(el) {
        $(el || 'body').css('position', 'unset')
        $(el || 'body')
            .find('.loading-container')
            .remove()
    }
}

export default loading
