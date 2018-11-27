import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAddonComponent } from './menu-addon.component';

describe('MenuAddonComponent', () => {
    let component: MenuAddonComponent;
    let fixture: ComponentFixture<MenuAddonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MenuAddonComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuAddonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
