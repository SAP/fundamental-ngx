import { waitForAsync } from '@angular/core/testing';
import { MenuInteractiveDirective } from './menu-interactive.directive';
import { MockElementRef } from '../../scroll-spy/scroll-spy.directive.spec';

describe('MenuLinkDirective', () => {
    let directive: MenuInteractiveDirective;

    beforeEach(
        waitForAsync(() => {
            directive = new MenuInteractiveDirective(new MockElementRef());
        })
    );

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should properly set selected state', () => {
        directive.setSubmenu(true, '123');
        directive.setSelected(true);

        expect(directive.selected).toBeTrue();

        directive.setSubmenu(false, '123');
        directive.setSelected(true);

        expect(directive.selected).toBeFalse();
    });

    it('should properly set disabled state', () => {
        directive.setDisabled(false);

        expect(directive.disabled).toBeFalse();
        expect(directive.tabindex).toEqual(0);

        directive.setDisabled(true);

        expect(directive.disabled).toBeTrue();
        expect(directive.tabindex).toEqual(-1);
    });

    it('should properly set submenu', () => {
        const menuId = 'test-id';
        directive.setSubmenu(true);

        expect(directive.ariaHaspopup).toBe('menu');
        expect(directive.submenuId).toBe(null);

        directive.setSubmenu(true, menuId);

        expect(directive.ariaHaspopup).toBe('menu');
        expect(directive.submenuId).toEqual(menuId);

        directive.setSubmenu(false);

        expect(directive.ariaHaspopup).toBe(null);
        expect(directive.submenuId).toBe(null);
    });
});
