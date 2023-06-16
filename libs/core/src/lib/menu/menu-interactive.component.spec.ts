import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuInteractiveComponent } from './menu-interactive.component';

describe('MenuInteractiveComponent', () => {
    let componentFixture: ComponentFixture<MenuInteractiveComponent>;
    let directive: MenuInteractiveComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MenuInteractiveComponent]
        }).compileComponents();
        componentFixture = TestBed.createComponent(MenuInteractiveComponent);
        directive = componentFixture.componentInstance;
    });

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
