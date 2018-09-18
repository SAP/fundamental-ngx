import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavigationItemComponent } from './side-navigation-item.component';

describe('SideNavigationItemComponent', () => {
    let component: SideNavigationItemComponent;
    let fixture: ComponentFixture<SideNavigationItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SideNavigationItemComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SideNavigationItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
