import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionBarDescriptionComponent } from './action-bar-description.component';

describe('ActionBarDescriptionComponent', () => {
    let component: ActionBarDescriptionComponent;
    let fixture: ComponentFixture<ActionBarDescriptionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ActionBarDescriptionComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ActionBarDescriptionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
