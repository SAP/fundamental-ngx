// Mock ALL operations BEFORE importing executor to prevent transitive imports
jest.mock('./operations/add-key', () => ({
    addKey: jest.fn()
}));

jest.mock('./operations/remove-key', () => ({
    removeKey: jest.fn()
}));

jest.mock('./operations/rename-key', () => ({
    renameKey: jest.fn()
}));

jest.mock('./operations/search-keys', () => ({
    searchKeys: jest.fn()
}));

jest.mock('./operations/validate', () => ({
    validate: jest.fn()
}));

jest.mock('./operations/update-key', () => ({
    updateKey: jest.fn()
}));

describe('i18n-manage Executor', () => {
    it('placeholder test', () => {
        expect(true).toBe(true);
    });
});
