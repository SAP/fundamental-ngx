import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ComboboxMobileComponent } from './combobox-mobile.component';
import { MobileModeConfig } from '../../utils/interfaces/mobile-mode-config';
import { DynamicComponentService } from '../../utils/dynamic-component/dynamic-component.service';
import { EventEmitter } from '@angular/core';
import { DialogModule } from '../../dialog/dialog.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { COMBOBOX_COMPONENT } from '../combobox.interface';
import { ComboboxComponent } from '../combobox.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ComboboxMobileComponent', () => {
    let component: ComboboxMobileComponent;
    let anyComponent: any;
    let fixture: ComponentFixture<ComboboxMobileComponent>;

    const testComboboxConfigObject: MobileModeConfig = {
        title: 'title', approveButtonText: 'approve', cancelButtonText: 'cancel', hasCloseButton: true
    };


    let comboboxInputComponent: Partial<ComboboxComponent> = {
        mobileConfig: {title: 'title', approveButtonText: 'approve', cancelButtonText: 'cancel', hasCloseButton: true},
        dialogDismiss: (backupArgument: string) => {},
        dialogApprove: () => {},
        openChange: new EventEmitter<boolean>()
    };

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ DialogModule, BrowserAnimationsModule, RouterTestingModule ],
            declarations: [ComboboxMobileComponent],
            providers: [ DynamicComponentService, {provide: COMBOBOX_COMPONENT, useValue: comboboxInputComponent} ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        comboboxInputComponent = {
            mobileConfig: {title: 'title', approveButtonText: 'approve', cancelButtonText: 'cancel', hasCloseButton: true},
            dialogDismiss: (backupArgument: string) => {},
            dialogApprove: () => {},
            openChange: new EventEmitter<boolean>()
        };
        fixture = TestBed.createComponent(ComboboxMobileComponent);
        component = fixture.componentInstance;
        anyComponent = <any>component;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get multi input config, when it is passed by input', () => {
        anyComponent._component.providedMultiInputConfig = null;
        expect(anyComponent.mobileConfig).toEqual(testComboboxConfigObject);
    });

    it('should open and close with approve', () => {
        anyComponent._component.mobile = true;
        component.ngOnInit();
        anyComponent._component.openChange.emit(true);
        spyOn(anyComponent._component, 'dialogApprove');
        fixture.detectChanges();
        expect(anyComponent._dialogService.hasOpenDialogs()).toBe(true);
        fixture.detectChanges();
        component.handleApprove();
        expect(anyComponent._component.dialogApprove).toHaveBeenCalled();
    });

    it('should open and close with dismiss', () => {
        anyComponent._component.mobile = true;
        component.ngOnInit();
        anyComponent._component.inputText = 'test';
        anyComponent._component.openChange.emit(true);
        spyOn(anyComponent._component, 'dialogDismiss');
        fixture.detectChanges();
        expect(anyComponent._dialogService.hasOpenDialogs()).toBe(true);
        fixture.detectChanges();
        component.handleDismiss();
        expect(anyComponent._component.dialogDismiss).toHaveBeenCalledWith('test');
    });
});
