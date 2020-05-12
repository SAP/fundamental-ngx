import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiInputMobileComponent } from './multi-input-mobile.component';
import { MultiInputMobileConfiguration } from './multi-input-mobile-configuration';
import { DialogService } from '../../dialog/dialog-service/dialog.service';
import { DynamicComponentService } from '../../utils/dynamic-component/dynamic-component.service';

describe('MultiInputMobileComponent', () => {
    let component: MultiInputMobileComponent;
    let anyComponent: any;
    let fixture: ComponentFixture<MultiInputMobileComponent>;

    const testedMultiInputConfigObject: MultiInputMobileConfiguration = {
        title: 'title', approveButton: 'approve', cancelButton: 'cancel', closeButton: true
    };

    const backupData: any[] = ['option 1', 'option 2', 'option 3'];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MultiInputMobileComponent],
            providers: [ DialogService , DynamicComponentService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MultiInputMobileComponent);
        component = fixture.componentInstance;
        anyComponent = <any>component;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get multi input config, when it is provided', () => {
        anyComponent._providedMultiInputConfig = testedMultiInputConfigObject;
        component.multiInputConfig = null;
        expect(anyComponent.getMultiInputConfig()).toEqual(testedMultiInputConfigObject);
    });

    it('should get multi input config, when it is passed by input', () => {
        anyComponent._providedMultiInputConfig = null;
        component.multiInputConfig = testedMultiInputConfigObject;
        expect(anyComponent.getMultiInputConfig()).toEqual(testedMultiInputConfigObject);
    });

    it('should open and close with approve', () => {
        component.multiInputConfig = testedMultiInputConfigObject;
        component.open(backupData);
        spyOn(component.dialogApprove, 'emit');
        fixture.detectChanges();
        expect(component.hasOpenDialogs()).toBe(true);

        anyComponent._dialogConfig.defaultObject.approveButtonCallback();

        expect(component.dialogApprove.emit).toHaveBeenCalled();
    });

    it('should open and close with dismiss by cancel button', () => {
        component.multiInputConfig = testedMultiInputConfigObject;
        component.open(backupData);
        spyOn(component.dialogDismiss, 'emit');
        fixture.detectChanges();
        expect(component.hasOpenDialogs()).toBe(true);

        anyComponent._dialogConfig.defaultObject.cancelButtonCallback();

        expect(component.dialogDismiss.emit).toHaveBeenCalledWith(backupData);
    });

    it('should open and close with dismiss by close button', () => {
        component.multiInputConfig = testedMultiInputConfigObject;
        component.open(backupData);
        spyOn(component.dialogDismiss, 'emit');
        fixture.detectChanges();
        expect(component.hasOpenDialogs()).toBe(true);

        anyComponent._dialogConfig.defaultObject.closeButtonCallback();

        expect(component.dialogDismiss.emit).toHaveBeenCalledWith(backupData);
    });

    it('should not be close button, when it is not added', () => {
        component.multiInputConfig = {...testedMultiInputConfigObject, closeButton: false};

        anyComponent._overwriteDialogProperties();

        expect(anyComponent._dialogConfig.defaultObject.closeButtonCallback).toBeFalsy();
    });
});
