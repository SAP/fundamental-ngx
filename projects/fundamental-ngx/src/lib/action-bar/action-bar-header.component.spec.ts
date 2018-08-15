import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionBarHeaderComponent } from './action-bar-header.component';

describe('ActionBarHeaderComponent', () => {
    let component: ActionBarHeaderComponent;
    let fixture: ComponentFixture<ActionBarHeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ActionBarHeaderComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ActionBarHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        spyOn(component, '_setProperties').and.callThrough();
        spyOn(component, '_addClassToElement');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        component.ngOnInit();
        expect(component._setProperties).toHaveBeenCalled();
        expect(component._addClassToElement).toHaveBeenCalledWith('fd-action-bar__header');
    });
});
