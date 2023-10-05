import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EventEmitter } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicComponentService } from '@fundamental-ngx/cdk/utils';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import { MultiInputComponent } from '../multi-input.component';
import { MULTI_INPUT_COMPONENT } from '../multi-input.interface';
import { MultiInputMobileComponent } from './multi-input-mobile.component';

describe('MultiInputMobileComponent', () => {
    let component: MultiInputMobileComponent;
    let anyComponent: any;
    let fixture: ComponentFixture<MultiInputMobileComponent>;

    const multiInputConfigObject: MobileModeConfig = {
        title: 'title',
        approveButtonText: 'approve',
        cancelButtonText: 'cancel',
        hasCloseButton: true
    };

    const backupData: any[] = ['option 1', 'option 2', 'option 3'];

    let mockedMultiInputComponent: Partial<MultiInputComponent> = {
        selected: backupData,
        mobileConfig: multiInputConfigObject,
        dialogDismiss: () => {},
        selectAllItems: () => {},
        dialogApprove: () => {},
        openChange: new EventEmitter<boolean>(),
        allItemsSelectedChange: new EventEmitter<boolean>()
    };

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [MultiInputMobileComponent, NoopAnimationsModule],
            declarations: [],
            providers: [
                DynamicComponentService,
                { provide: MULTI_INPUT_COMPONENT, useValue: mockedMultiInputComponent }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        mockedMultiInputComponent = {
            selected: backupData,
            mobileConfig: {
                title: 'title',
                approveButtonText: 'approve',
                cancelButtonText: 'cancel',
                hasCloseButton: true
            },
            dialogDismiss: () => {},
            selectAllItems: () => {},
            dialogApprove: () => {},
            openChange: new EventEmitter<boolean>(),
            allItemsSelectedChange: new EventEmitter<boolean>()
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
        const approveSpy = jest.spyOn(anyComponent._component, 'dialogApprove');
        fixture.detectChanges();
        anyComponent._component.openChange.emit(true);
        fixture.detectChanges();
        component.handleApprove();
        expect(approveSpy).toHaveBeenCalled();
    });

    it('should open and close with dismiss', () => {
        component.ngOnInit();
        const dismissSpy = jest.spyOn(anyComponent._component, 'dialogDismiss');
        fixture.detectChanges();
        anyComponent._component.selected = [];
        anyComponent._component.openChange.emit(true);
        fixture.detectChanges();
        component.handleDismiss();
        expect(dismissSpy).toHaveBeenCalledWith([]);
    });
});
