import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionBarTitleComponent } from './action-bar-title.component';

describe('ActionBarTitleComponent', () => {
    let component: ActionBarTitleComponent;
    let fixture: ComponentFixture<ActionBarTitleComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ActionBarTitleComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ActionBarTitleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
