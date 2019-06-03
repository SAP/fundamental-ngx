import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavigationSubItemComponent } from './side-navigation-subitem.component';

describe('SideNavigationSubItemComponent', () => {
    let component: SideNavigationSubItemComponent;
    let fixture: ComponentFixture<SideNavigationSubItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SideNavigationSubItemComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SideNavigationSubItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
