import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemComponent } from './menu-item.component';

describe('MenuItemComponent', () => {
    let component: MenuItemComponent;
    let fixture: ComponentFixture<MenuItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MenuItemComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should change the cursor', () => {
        let retVal = component.getCursor();
        expect(retVal).toBe('text');
        component.url = 'someUrl';
        retVal = component.getCursor();
        expect(retVal).toBe('pointer');
        component.url = null;
        component.routerLink = 'someLink';
        retVal = component.getCursor();
        expect(retVal).toBe('pointer');
    });
});
