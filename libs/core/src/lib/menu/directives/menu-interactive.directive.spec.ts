import { waitForAsync } from '@angular/core/testing';
import { MenuInteractiveDirective } from './menu-interactive.directive';
import { MockElementRef } from '@fundamental-ngx/core/tests';

describe('MenuLinkDirective', () => {
    let directive: MenuInteractiveDirective;

    beforeEach(waitForAsync(() => {
        directive = new MenuInteractiveDirective(new MockElementRef());
    }));

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should properly set selected state', () => {
        directive.ariaHaspopup = true;
        directive.setSelected(true);

        expect(directive.selected).toBe(true);

        directive.setSelected(false);
        directive.ariaHaspopup = false;
        directive.setSelected(true);

        expect(directive.selected).toBe(false);
    });

    it('should properly set disabled state', () => {
        directive.setDisabled(false);

        expect(directive.disabled).toBe(false);
        expect(directive.tabindex).toEqual(0);

        directive.setDisabled(true);

        expect(directive.disabled).toBe(true);
        expect(directive.tabindex).toEqual(-1);
    });

    it('should properly set submenu', () => {
        const menuId = 'test-id';
        directive.setSubmenu(true);

        expect(directive.ariaHaspopup).toBe(true);
        expect(directive.ariaControls).toBeFalsy();

        directive.setSubmenu(true, menuId);

        expect(directive.ariaHaspopup).toBe(true);
        expect(directive.ariaControls).toEqual(menuId);

        directive.setSubmenu(false);

        expect(directive.ariaHaspopup).toBe(false);
        expect(directive.ariaControls).toBeFalsy();
    });
});
