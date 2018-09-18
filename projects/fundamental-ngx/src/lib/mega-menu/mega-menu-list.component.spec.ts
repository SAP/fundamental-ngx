import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MegaMenuListComponent } from './mega-menu-list.component';

describe('MegaMenuListComponent', () => {
    let component: MegaMenuListComponent;
    let fixture: ComponentFixture<MegaMenuListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MegaMenuListComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MegaMenuListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
