module.exports = {
    ifEquals: function (value1, value2, options) {
        return value1 === value2 ? options.fn(this) : options.inverse(this);
    },
    ifDecoratorsContain: function (element, compareValue, options) {
        if (!element || !element.decorators) {
            return options.inverse(this);
        }
        const found = element.decorators.find(element => element.name.toLocaleUpperCase() === compareValue.toLocaleUpperCase());
        return found ? options.fn(this) : options.inverse(this);
    },
    ifNotPreProcessedDecorator: function (element, options) {

        if (!element || !element.decorators) {
            return options.inverse(this);
        }

        const preprocessedDecorators = [
            'INPUT',
            'OUTPUT'
        ];

        preprocessedDecorators.forEach(decorator => {
            if (element.decorators.find(element => element.name.toLocaleUpperCase() === decorator)) {
                return options.inverse(this);
            }
        });
        return options.fn(this);
    }
};
