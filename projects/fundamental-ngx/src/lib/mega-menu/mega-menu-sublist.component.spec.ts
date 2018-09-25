import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MegaMenuSubListComponent } from './mega-menu-sublist.component';

describe('MegaMenuSubListComponent', () => {
    let component: MegaMenuSubListComponent;
    let fixture: ComponentFixture<MegaMenuSubListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MegaMenuSubListComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MegaMenuSubListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
