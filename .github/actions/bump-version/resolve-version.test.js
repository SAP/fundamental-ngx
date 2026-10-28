const assert = require('node:assert/strict');
const test = require('node:test');

const resolveVersion = require('./resolve-version');

test('uses the checked-out package version for a manual hotfix', () => {
    assert.equal(
        resolveVersion({ isManual: true, isHotfix: true, currentVersion: '0.66.1-rc.2', branchVersion: '0.65.1' }),
        '0.65.1'
    );
});

test('keeps the resolved current version for non-hotfix releases', () => {
    assert.equal(
        resolveVersion({ isManual: true, isHotfix: false, currentVersion: '0.66.1-rc.2', branchVersion: '0.65.1' }),
        '0.66.1-rc.2'
    );
});

test('keeps the resolved current version for automatic hotfix calculation', () => {
    assert.equal(
        resolveVersion({ isManual: false, isHotfix: true, currentVersion: '0.66.1-rc.2', branchVersion: '0.65.1' }),
        '0.66.1-rc.2'
    );
});

test('keeps the resolved current version for automatic non-hotfix calculation', () => {
    assert.equal(
        resolveVersion({ isManual: false, isHotfix: false, currentVersion: '0.66.1-rc.2', branchVersion: '0.65.1' }),
        '0.66.1-rc.2'
    );
});

test('rejects a missing or invalid manual hotfix version', () => {
    assert.throws(
        () => resolveVersion({ isManual: true, isHotfix: true, currentVersion: '0.66.1-rc.2' }),
        /Manual hotfix release requires a valid version in libs\/core\/package\.json/
    );
});
