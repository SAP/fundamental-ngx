import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MegaMenuSubItemComponent } from './mega-menu-subitem.component';

describe('MegaMenuSubItemComponent', () => {
    let component: MegaMenuSubItemComponent;
    let fixture: ComponentFixture<MegaMenuSubItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MegaMenuSubItemComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MegaMenuSubItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
