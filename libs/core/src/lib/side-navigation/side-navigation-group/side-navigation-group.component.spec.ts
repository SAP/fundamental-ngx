import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavigationGroupComponent } from './side-navigation-group.component';

describe('SideNavigationGroupComponent', () => {
    let component: SideNavigationGroupComponent;
    let fixture: ComponentFixture<SideNavigationGroupComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SideNavigationGroupComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SideNavigationGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
