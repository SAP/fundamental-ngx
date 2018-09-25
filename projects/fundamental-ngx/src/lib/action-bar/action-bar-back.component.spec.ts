import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionBarBackComponent } from './action-bar-back.component';

describe('ActionBarBackComponent', () => {
    let component: ActionBarBackComponent;
    let fixture: ComponentFixture<ActionBarBackComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ActionBarBackComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ActionBarBackComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        spyOn(component, '_setProperties').and.callThrough();
        spyOn(component, '_addClassToElement');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        component.ngOnInit();
        expect(component._setProperties).toHaveBeenCalled();
        expect(component._addClassToElement).toHaveBeenCalledWith('fd-action-bar__back');
    });
});
