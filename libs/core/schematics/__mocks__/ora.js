/* eslint-disable @typescript-eslint/no-empty-function */
// Mock ora spinner to avoid ESM import issues
module.exports = function ora() {
    return {
        start: () => ({ succeed: () => {}, fail: () => {}, stop: () => {} }),
        succeed: () => {},
        fail: () => {},
        stop: () => {},
        clear: () => {},
        render: () => {}
    };
};

module.exports.default = module.exports;
