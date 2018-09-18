import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionBarActionsComponent } from './action-bar-actions.component';

describe('ActionBarActionsComponent', () => {
    let component: ActionBarActionsComponent;
    let fixture: ComponentFixture<ActionBarActionsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ActionBarActionsComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ActionBarActionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        spyOn(component, '_setProperties').and.callThrough();
        spyOn(component, '_addClassToElement');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        component.ngOnInit();
        expect(component._setProperties).toHaveBeenCalled();
        expect(component._addClassToElement).toHaveBeenCalledWith('fd-action-bar__actions');
    });
});
