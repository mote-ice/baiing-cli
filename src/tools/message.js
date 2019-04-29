import toastr from 'toastr';

const message = function(type, option = {}) {
    toastr.options = {
        'closeButton': option.closeButton || true,
        'debug': option.debug || false,
        'positionClass': option.positionClass || 'toast-top-right',
        'onclick': option.onclick || null,
        'showDuration': option.showDuration || '1000',
        'hideDuration': option.hideDuration || '1000',
        'timeOut': option.timeOut || '2000',
        'extendedTimeOut': option.extendedTimeOut || '1000',
        'showEasing': option.showEasing || 'swing',
        'hideEasing': option.hideEasing || 'linear',
        'showMethod': option.showMethod || 'fadeIn',
        'hideMethod': option.hideMethod || 'fadeOut'
    };
    toastr[type](option.message || '提示信息', option.title || '提示');
};

export default message;