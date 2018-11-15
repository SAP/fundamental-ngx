import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavigationTitleComponent } from './side-navigation-title.component';

describe('SideNavigationTitleComponent', () => {
    let component: SideNavigationTitleComponent;
    let fixture: ComponentFixture<SideNavigationTitleComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SideNavigationTitleComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SideNavigationTitleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
