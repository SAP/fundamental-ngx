import { MenuAddonDirective } from './menu-addon.directive';

describe('MenuAddonDirective', () => {
    let directive: MenuAddonDirective;

    beforeEach(() => {
        directive = new MenuAddonDirective();
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should set proper position', () => {
        directive.setAddonPosition = 'before';

        expect(directive.fdAddonAfterClass).toBe(false);
        expect(directive.fdAddonBeforeClass).toBe(true);

        directive.setAddonPosition = 'after';

        expect(directive.fdAddonAfterClass).toBe(true);
        expect(directive.fdAddonBeforeClass).toBe(false);
    });

    it('should have proper initial position', () => {
        expect(directive.fdAddonAfterClass).toBe(true);
        expect(directive.fdAddonBeforeClass).toBe(false);
    });
});
