import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavigationIconComponent } from './side-navigation-icon.component';

describe('SideNavigationIconComponent', () => {
    let component: SideNavigationIconComponent;
    let fixture: ComponentFixture<SideNavigationIconComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SideNavigationIconComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SideNavigationIconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
