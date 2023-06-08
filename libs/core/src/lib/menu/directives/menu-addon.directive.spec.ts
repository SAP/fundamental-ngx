import { MenuAddonDirective } from './menu-addon.directive';
import { TestBed, waitForAsync } from '@angular/core/testing';

describe('MenuAddonDirective', () => {
    let directive: MenuAddonDirective;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [MenuAddonDirective]
        }).compileComponents();
        directive = TestBed.createComponent(MenuAddonDirective).componentInstance;
    }));

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
