declare global {
    var $: any
}

class loading {
    tag(size: number): string {
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
    }
    size(el: any): number {
        let size: number = 40
        if (el) {
            let width: number = $(el).outerWidth(),
                height: number = $(el).outerHeight(),
                WH: number = width - height >= 0 ? height : width
            if (WH < 40) size = 20
        }
        return size
    }
    start(el: any): void {
        $(el || 'body').css('position', 'relative')
        $(el || 'body').append($(this.tag(this.size(el))))
    }
    stop(el: any): void {
        $(el || 'body').css('position', 'unset')
        $(el || 'body')
            .find('.loading-container')
            .remove()
    }
}

export default new loading()
