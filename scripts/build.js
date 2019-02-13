/* eslint-disable no-console */
/* eslint-disable strict */
/* eslint-disable compat/compat */
'use strict';

const fs = require('fs-extra');

fs.copyFile('README.md', 'docs/assets/README.md', err => {
    if (err) throw err;
});
fs.copyFile('NEW_COMPONENT.md', 'docs/assets/NEW_COMPONENT.md', err => {
    if (err) throw err;
});
