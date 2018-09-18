import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MegaMenuItemComponent } from './mega-menu-item.component';

describe('MegaMenuItemComponent', () => {
    let component: MegaMenuItemComponent;
    let fixture: ComponentFixture<MegaMenuItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MegaMenuItemComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MegaMenuItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
