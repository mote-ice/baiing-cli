import $ from 'jquery'
/**
 * [初始化页面布局以及菜单]
 * @return {[type]} [description]
 */
;(function() {
    const tagMenu = $('.menu-container li'),
        currentUrl = self.location.pathname

    $.each(tagMenu, (index, item) => {
        let itemHref = $(item)
            .find('a')
            .attr('href')
        if (itemHref === currentUrl) {
            $('.menu-container li').removeClass('active')
            $(item).addClass('active')
        }
    })
})()
