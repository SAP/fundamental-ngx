import { TestBed, waitForAsync } from '@angular/core/testing';
import { MenuAddonDirective } from './menu-addon.directive';

describe('MenuAddonDirective', () => {
    let directive: MenuAddonDirective;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [MenuAddonDirective]
        }).compileComponents();
        directive = TestBed.createComponent(MenuAddonDirective).componentInstance;
    }));

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
