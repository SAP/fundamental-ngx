import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboboxMobileComponent } from './combobox-mobile.component';
import { MobileModeConfig } from '../../utils/interfaces/mobile-mode-config';
import { DynamicComponentService } from '../../utils/dynamic-component/dynamic-component.service';
import { EventEmitter } from '@angular/core';
import { DialogModule } from '../../dialog/dialog.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { COMBOBOX_COMPONENT } from '../combobox.interface';
import { ComboboxComponent } from '../combobox.component';

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

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ DialogModule, BrowserAnimationsModule ],
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
        anyComponent._comboboxComponent.providedMultiInputConfig = null;
        expect(anyComponent.getMultiInputConfig()).toEqual(testComboboxConfigObject);
    });

    it('should open and close with approve', () => {
        anyComponent._comboboxComponent.mobile = true;
        component.ngOnInit();
        component.ngAfterViewInit();
        spyOn(anyComponent._dialogRef._onHide, 'next');
        spyOn(anyComponent._comboboxComponent, 'dialogApprove');
        fixture.detectChanges();
        expect(anyComponent._dialogService.hasOpenDialogs()).toBe(true);
        anyComponent._comboboxComponent.openChange.emit(true);
        fixture.detectChanges();
        expect(anyComponent._dialogRef._onHide.next).toHaveBeenCalledWith(false);
        component.handleApprove();
        expect(anyComponent._comboboxComponent.dialogApprove).toHaveBeenCalled();
    });

    it('should open and close with dismiss', () => {
        anyComponent._comboboxComponent.mobile = true;
        component.ngOnInit();
        component.ngAfterViewInit();
        spyOn(anyComponent._dialogRef._onHide, 'next');
        spyOn(anyComponent._comboboxComponent, 'dialogDismiss');
        fixture.detectChanges();
        expect(anyComponent._dialogService.hasOpenDialogs()).toBe(true);
        anyComponent._comboboxComponent.inputText = 'test';
        anyComponent._comboboxComponent.openChange.emit(true);
        fixture.detectChanges();
        expect(anyComponent._dialogRef._onHide.next).toHaveBeenCalledWith(false);
        component.handleDismiss();
        expect(anyComponent._comboboxComponent.dialogDismiss).toHaveBeenCalledWith('test');
    });
});
