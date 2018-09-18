import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavigationLinkComponent } from './side-navigation-link.component';

describe('SideNavigationLinkComponent', () => {
    let component: SideNavigationLinkComponent;
    let fixture: ComponentFixture<SideNavigationLinkComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SideNavigationLinkComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SideNavigationLinkComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(component.sublistIsOpen).toBe(false);
    });
});
