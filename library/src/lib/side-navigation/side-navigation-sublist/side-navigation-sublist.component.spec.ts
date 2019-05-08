import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavigationSubListComponent } from './side-navigation-sublist.component';

describe('SideNavigationSubListComponent', () => {
    let component: SideNavigationSubListComponent;
    let fixture: ComponentFixture<SideNavigationSubListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SideNavigationSubListComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SideNavigationSubListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
