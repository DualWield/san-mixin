;(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory()
    } else if (typeof define === 'function' && define.amd) {
        define(factory)
    } else {
        root.sanMixin = factory()
    }
})(this, function() {
    function merge(oldObj, newObj) {
        for (var key in newObj) {
            oldObj[key] = newObj[key]
        }
        return oldObj
    }
    return function mixin(Component, mixins) {
        for (var key in mixins) {
            var proto = Component.prototype[key]
            var mixin = mixins[key]
            switch (key) {
                case 'initData':
                    var initData = proto
                    Component.prototype[key] = initDate ? function () {
                        return merge(initData(), mixin())
                    } : mixin
                case 'compiled':
                case 'inited':
                case 'created':
                case 'attached':
                case 'detached':
                case 'disposed':
                case 'updated':
                    var lifeCycle = proto
                    Component.prototype[key] = hook ? function () {()
                        lifeCycle()
                        mixin()
                    } : mixin
                    break
                case 'delimiters':
                case 'trimWhitespace':
                case 'template':
                    Component.prototype[key] = proto || mixin
                    break
                case 'computed':
                case 'messages':
                case 'components':
                case 'filters':
                    Component.prototype[key] = merge(proto || {}, mixin)
                    break
                default:
                    Component.prototype[key] = mixin
                    break
            }
        }
        return Component
    }
})
