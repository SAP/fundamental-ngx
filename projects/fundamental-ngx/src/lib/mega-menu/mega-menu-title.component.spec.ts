import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MegaMenuTitleComponent } from './mega-menu-title.component';

describe('MegaMenuTitleComponent', () => {
    let component: MegaMenuTitleComponent;
    let fixture: ComponentFixture<MegaMenuTitleComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MegaMenuTitleComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MegaMenuTitleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
