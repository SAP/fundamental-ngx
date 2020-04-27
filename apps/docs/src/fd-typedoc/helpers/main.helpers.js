module.exports = {
    ifEquals: function (value1, value2, options) {
        return value1 === value2 ? options.fn(this) : options.inverse(this);
    },
    ifNotEquals: function (value1, value2, options) {
        return value1 !== value2 ? options.fn(this) : options.inverse(this);
    },
    ifDecoratorsContain: function (element, compareValue, options) {
        if (!element || !element.decorators) {
            return options.inverse(this);
        }
        const found = element.decorators.find(
            (item) => item.name.toLocaleUpperCase() === compareValue.toLocaleUpperCase()
        );
        return found ? options.fn(this) : options.inverse(this);
    },
    ifNoDecorators: function (element, options) {
        if (!element || !element.decorators) {
            return options.fn(this);
        }

        for (item of element.decorators) {
            if (item.name.toLocaleUpperCase() === 'OUTPUT' || item.name.toLocaleUpperCase() === 'INPUT') {
                return options.inverse(this);
            }
        }
        return options.fn(this);
    },
    ifChildrenContainDecorator: function (array, compareValue, options) {
        if (!array || array.length === 0) {
            return options.inverse(this);
        }

        for (item of array) {
            if (item.decorators) {
                for (dec of item.decorators) {
                    if (dec && dec.name.toLocaleUpperCase() === compareValue.toLocaleUpperCase()) {
                        return options.fn(this);
                    }
                }
            }
        }
        return options.inverse(this);
    },
    ifChildrenContainNonDecorators: function (array, options) {
        if (!array || array.length === 0) {
            return options.inverse(this);
        }

        for (item of array) {
            if (item.decorators) {
                for (dec of item.decorators) {
                    if (dec && dec.name.toLocaleUpperCase() !== 'INPUT' && dec.name.toLocaleUpperCase() !== 'OUTPUT') {
                        return options.fn(this);
                    }
                }
            } else {
                return options.fn(this);
            }
        }
        return options.inverse(this);
    },
    parseSelector: function (str) {
        let selectorStr = str.match(/(selector: '(.*?)')/g) + '';
        selectorStr = selectorStr.replace('selector: ', '').replace(/['\[\]]/g, '');
        return selectorStr;
    },
    getAllWithDecorator: function (groups, decorator, options) {
        if (!groups || !decorator) {
            return;
        }

        let total = [];
        groups.forEach((group) => {
            if (group.children)
                group.children.forEach((child) => {
                    if (child.decorators)
                        child.decorators.forEach((dec) => {
                            if (dec && dec.name.toLocaleUpperCase() === decorator.toLocaleUpperCase()) {
                                total.push(child);
                            }
                        });
                });
        });
        return options.fn(total);
    }
};
