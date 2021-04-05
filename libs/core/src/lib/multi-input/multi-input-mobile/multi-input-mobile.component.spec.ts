import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MultiInputMobileComponent } from './multi-input-mobile.component';
import { MobileModeConfig } from '../../utils/interfaces/mobile-mode-config';
import { DynamicComponentService } from '../../utils/dynamic-component/dynamic-component.service';
import { EventEmitter } from '@angular/core';
import { DialogModule } from '../../dialog/dialog.module';
import { MultiInputComponent } from '../multi-input.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MULTI_INPUT_COMPONENT } from '../multi-input.interface';

describe('MultiInputMobileComponent', () => {
    let component: MultiInputMobileComponent;
    let anyComponent: any;
    let fixture: ComponentFixture<MultiInputMobileComponent>;

    const multiInputConfigObject: MobileModeConfig = {
        title: 'title', approveButtonText: 'approve', cancelButtonText: 'cancel', hasCloseButton: true
    };

    const backupData: any[] = ['option 1', 'option 2', 'option 3'];

    let mockedMultiInputComponent: Partial<MultiInputComponent> = {
        selected: backupData,
        mobileConfig: multiInputConfigObject,
        dialogDismiss: (backupArguments: any[]) => {},
        selectAllItems: () => {},
        dialogApprove: () => {},
        openChange: new EventEmitter<boolean>()
    };

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ DialogModule, BrowserAnimationsModule ],
            declarations: [MultiInputMobileComponent],
            providers: [ DynamicComponentService, {provide: MULTI_INPUT_COMPONENT, useValue: mockedMultiInputComponent} ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        mockedMultiInputComponent = {
            selected: backupData,
            mobileConfig: {title: 'title', approveButtonText: 'approve', cancelButtonText: 'cancel', hasCloseButton: true},
            dialogDismiss: (backupArguments: any[]) => {},
            selectAllItems: () => {},
            dialogApprove: () => {},
            openChange: new EventEmitter<boolean>()
        };
        fixture = TestBed.createComponent(MultiInputMobileComponent);
        component = fixture.componentInstance;
        anyComponent = <any>component;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get multi input config, when it is passed by input', () => {
        expect(anyComponent.mobileConfig).toEqual(multiInputConfigObject);
    });

    it('should open and close with approve', () => {
        component.ngOnInit();
        component.ngAfterViewInit();
        spyOn(anyComponent.dialogRef._onHide, 'next');
        spyOn(anyComponent._component, 'dialogApprove');
        fixture.detectChanges();
        expect(anyComponent._dialogService.hasOpenDialogs()).toBe(true);
        anyComponent._component.openChange.emit(true);
        fixture.detectChanges();
        expect(anyComponent.dialogRef._onHide.next).toHaveBeenCalledWith(false);
        component.handleApprove();
        expect(anyComponent._component.dialogApprove).toHaveBeenCalled();
    });

    it('should open and close with dismiss', () => {
        component.ngOnInit();
        component.ngAfterViewInit();
        spyOn(anyComponent.dialogRef._onHide, 'next');
        spyOn(anyComponent._component, 'dialogDismiss');
        fixture.detectChanges();
        expect(anyComponent._dialogService.hasOpenDialogs()).toBe(true);
        anyComponent._component.selected = [];
        anyComponent._component.openChange.emit(true);
        fixture.detectChanges();
        expect(anyComponent.dialogRef._onHide.next).toHaveBeenCalledWith(false);
        component.handleDismiss();
        expect(anyComponent._component.dialogDismiss).toHaveBeenCalledWith([]);
    });
});
