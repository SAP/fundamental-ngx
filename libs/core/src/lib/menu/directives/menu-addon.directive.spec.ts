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

        expect(directive.fdAddonAfterClass).toBeFalse();
        expect(directive.fdAddonBeforeClass).toBeTrue();

        directive.setAddonPosition = 'after';

        expect(directive.fdAddonAfterClass).toBeTrue();
        expect(directive.fdAddonBeforeClass).toBeFalse();
    });

    it('should have proper initial position', () => {
        expect(directive.fdAddonAfterClass).toBeTrue();
        expect(directive.fdAddonBeforeClass).toBeFalse();
    });
});
