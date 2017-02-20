function getFuncFromString(func, aggr) {
    // if already a function, return
    if (typeof func === 'function') return func;

    // if string, try to find function or method of object (of "obj.func" format)
    if (typeof func === 'string') {
        if (!func.length) return null;
        var target = window;
        var func = func.split('.');
        while (func.length) {
            var ns = func.shift();
            if (typeof target[ns] === 'undefined') return null;
            if(aggr === 'undefined') {
                target = target[ns](aggr);
            }else{
                target = target[ns];
            }
        }
        if (typeof target === 'function') return target;
    }

    // return null if could not parse
    return null;
}
!function (e) {
    "use strict";
    var t = function () {
    };
    t.prototype.init = function () {
        e(document).on("click", "[data-confirmation]", function () {
            var confirmText = $(this).attr("data-confirmation");
            var functionName = $(this).attr("data-confirmationEvent");
            var targetID = $(this).attr("data-targetID");
            swal({
                title: "Biztosan törölni szeretnéd?",
                text: confirmText,
                type: "warning",
                showCancelButton: !0,
                confirmButtonClass: "btn-warning",
                confirmButtonText: "Igen, törölje!",
                cancelButtonText: "Mégsem",
                closeOnConfirm: !1
            }, function () {
                var retData = eval(functionName+"("+targetID+")");
            })
        })
    }, e.SweetAlert = new t, e.SweetAlert.Constructor = t
}(window.jQuery), function (e) {
    "use strict";
    e.SweetAlert.init()
}(window.jQuery);