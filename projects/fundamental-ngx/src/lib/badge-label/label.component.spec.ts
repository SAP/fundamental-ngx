import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelComponent } from './label.component';

describe('LabelComponent', () => {
    let component: LabelComponent;
    let fixture: ComponentFixture<LabelComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LabelComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LabelComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();

        spyOn(component, '_setProperties').and.callThrough();
        spyOn(component, '_addClassToElement');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should add status labels', () => {
        component.isStatusLabel = true;
        component.status = 'someStatus';
        component.statusIcon = 'someStatusIcon';
        component.icon = 'someIcon';
        component.ngOnInit();
        expect(component._setProperties).toHaveBeenCalled();
        expect(component._addClassToElement).toHaveBeenCalledWith('fd-status-label');
        expect(component._addClassToElement).toHaveBeenCalledWith('fd-status-label--someStatus');
        expect(component._addClassToElement).toHaveBeenCalledWith('fd-status-label--someStatusIcon');
        expect(component._addClassToElement).toHaveBeenCalledWith('sap-icon--someIcon');
    });

    it('should add non-status labels', () => {
        component.isStatusLabel = false;
        component.status = 'someStatus';
        component.ngOnInit();
        expect(component._setProperties).toHaveBeenCalled();
        expect(component._addClassToElement).toHaveBeenCalledWith('fd-label');
        expect(component._addClassToElement).toHaveBeenCalledWith('fd-label--someStatus');
    });
});
