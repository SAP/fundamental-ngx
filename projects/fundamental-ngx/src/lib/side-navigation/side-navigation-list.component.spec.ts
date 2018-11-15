import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavigationListComponent } from './side-navigation-list.component';

describe('SideNavigationListComponent', () => {
    let component: SideNavigationListComponent;
    let fixture: ComponentFixture<SideNavigationListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SideNavigationListComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SideNavigationListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
