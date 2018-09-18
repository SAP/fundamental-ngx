import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MegaMenuLinkComponent } from './mega-menu-link.component';

describe('MegaMenuLinkComponent', () => {
    let component: MegaMenuLinkComponent;
    let fixture: ComponentFixture<MegaMenuLinkComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MegaMenuLinkComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MegaMenuLinkComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
