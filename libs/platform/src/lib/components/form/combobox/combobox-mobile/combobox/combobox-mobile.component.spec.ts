import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DialogModule, DynamicComponentService, MobileModeConfig } from '@fundamental-ngx/core';

import { ComboboxComponent } from '../../combobox/combobox.component';
import { COMBOBOX_COMPONENT } from '../../combobox.interface';
import { ComboboxMobileComponent } from './combobox-mobile.component';

describe('ComboboxMobileComponent', () => {
    let component: ComboboxMobileComponent;
    let anyComponent: any;
    let fixture: ComponentFixture<ComboboxMobileComponent>;

    const testComboboxConfigObject: MobileModeConfig = {
        title: 'title', approveButtonText: 'approve', cancelButtonText: 'cancel', hasCloseButton: true
    };

    let comboboxInputComponent: Partial<ComboboxComponent> = {
        mobileConfig: {
            title: 'title',
            approveButtonText: 'approve',
            cancelButtonText: 'cancel',
            hasCloseButton: true
        },
        dialogDismiss: (backupArgument: string) => {
        },
        dialogApprove: () => {
        },
        openChange: new EventEmitter<boolean>()
    };

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [DialogModule, BrowserAnimationsModule],
            declarations: [ComboboxMobileComponent],
            providers: [DynamicComponentService, { provide: COMBOBOX_COMPONENT, useValue: comboboxInputComponent }]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        comboboxInputComponent = {
            mobileConfig: {
                title: 'title',
                approveButtonText: 'approve',
                cancelButtonText: 'cancel',
                hasCloseButton: true
            },
            dialogDismiss: (backupArgument: string) => {
            },
            dialogApprove: () => {
            },
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
