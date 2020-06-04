import { async } from '@angular/core/testing';
import { MenuInteractiveDirective } from './menu-interactive.directive';
import { MockElementRef } from '../../scroll-spy/scroll-spy.directive.spec';

describe('MenuLinkDirective', () => {
    let directive: MenuInteractiveDirective;

    beforeEach(async(() => {
        directive = new MenuInteractiveDirective(new MockElementRef())
    }));

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should properly set selected state', () => {
        directive.hasSubmenu = true;
        directive.setSelected(true);

        expect(directive.selected).toBeTrue();

        directive.setSelected(false);
        directive.hasSubmenu = false;
        directive.setSelected(true);

        expect(directive.selected).toBeFalse();
    });

    it('should properly set disabled state', () => {
        directive.setDisabled(false);

        expect(directive.disabled).toBeFalse();
        expect(directive.focusable).toEqual(0);

        directive.setDisabled(true);

        expect(directive.disabled).toBeTrue();
        expect(directive.focusable).toEqual(-1);
    });

    it('should properly set submenu', () => {
        const menuId = 'test-id';
        directive.setSubmenu(true);

        expect(directive.hasSubmenu).toBeTrue();
        expect(directive.itemId).toBeFalsy();

        directive.setSubmenu(true, menuId);

        expect(directive.hasSubmenu).toBeTrue();
        expect(directive.itemId).toEqual(menuId);

        directive.setSubmenu(false);

        expect(directive.hasSubmenu).toBeFalse();
        expect(directive.itemId).toBeFalsy();
    });
});
