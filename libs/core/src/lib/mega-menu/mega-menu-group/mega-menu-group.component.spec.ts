import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MegaMenuGroupComponent } from './mega-menu-group.component';

describe('MegaMenuGroupComponent', () => {
    let component: MegaMenuGroupComponent;
    let fixture: ComponentFixture<MegaMenuGroupComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MegaMenuGroupComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MegaMenuGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
