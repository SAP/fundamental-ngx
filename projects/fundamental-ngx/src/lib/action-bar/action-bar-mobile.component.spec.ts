import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionBarMobileComponent } from './action-bar-mobile.component';

describe('ActionBarMobileComponent', () => {
    let component: ActionBarMobileComponent;
    let fixture: ComponentFixture<ActionBarMobileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ActionBarMobileComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ActionBarMobileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
