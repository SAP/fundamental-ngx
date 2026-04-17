const baseConfig = require('../../eslint.config.js');
const overrides = require('../../eslint.overrides.js');

module.exports = [...baseConfig, ...overrides];
