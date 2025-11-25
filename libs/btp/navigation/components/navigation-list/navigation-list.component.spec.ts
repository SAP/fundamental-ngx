import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationListComponent } from './navigation-list.component';

describe('NavigationListComponent', () => {
    let component: NavigationListComponent;
    let fixture: ComponentFixture<NavigationListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NavigationListComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(NavigationListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set parentItems property', () => {
        component.parentItems = true;
        expect(component.parentItems).toBe(true);
    });

    it('should set childItems property', () => {
        component.childItems = true;
        expect(component.childItems).toBe(true);
    });

    it('should set noGrow property', () => {
        component.noGrow = true;
        expect(component.noGrow).toBe(true);
    });

    it('should set withKeyboardNavigation property', () => {
        component.withKeyboardNavigation = true;
        expect(component.withKeyboardNavigation).toBe(true);
    });

    it('should set role property', () => {
        component.role = 'menu';
        expect(component.role).toBe('menu');
    });

    it('should set ariaLabel property', () => {
        component.ariaLabel = 'Test navigation';
        expect(component.ariaLabel).toBe('Test navigation');
    });
});
