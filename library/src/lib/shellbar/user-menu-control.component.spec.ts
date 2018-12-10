import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMenuControlComponent } from './user-menu-control.component';

describe('UserMenuControlComponent', () => {
    let component: UserMenuControlComponent;
    let fixture: ComponentFixture<UserMenuControlComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ UserMenuControlComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserMenuControlComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
