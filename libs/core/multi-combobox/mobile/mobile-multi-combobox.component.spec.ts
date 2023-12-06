import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { DynamicComponentService } from '@fundamental-ngx/cdk/utils';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import { MultiComboboxComponent } from '../../multi-combobox/multi-combobox.component';
import { MULTI_COMBOBOX_COMPONENT } from '../multi-combobox.token';
import { MobileMultiComboboxComponent } from './mobile-multi-combobox.component';

describe('MobileMultiComboboxComponent', () => {
    let component: MobileMultiComboboxComponent;
    let anyComponent: any;
    let fixture: ComponentFixture<MobileMultiComboboxComponent>;

    const testMobileConfigObject: MobileModeConfig = {
        title: 'title',
        approveButtonText: 'approve',
        cancelButtonText: 'cancel',
        hasCloseButton: true
    };

    let multiComboboxInputComponent: Partial<MultiComboboxComponent> = {
        mobileConfig: {
            title: 'title',
            approveButtonText: 'approve',
            cancelButtonText: 'cancel',
            hasCloseButton: true
        },
        _dialogDismiss: () => {},
        _dialogApprove: () => {},
        openChange: new EventEmitter<boolean>()
    };

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [MobileMultiComboboxComponent, NoopAnimationsModule],
            providers: [
                DynamicComponentService,
                {
                    provide: MULTI_COMBOBOX_COMPONENT,
                    useValue: multiComboboxInputComponent
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        multiComboboxInputComponent = {
            mobileConfig: {
                title: 'title',
                approveButtonText: 'approve',
                cancelButtonText: 'cancel',
                hasCloseButton: true
            },
            _dialogDismiss: () => {},
            _dialogApprove: () => {},
            openChange: new EventEmitter<boolean>()
        };
        fixture = TestBed.createComponent(MobileMultiComboboxComponent);
        component = fixture.componentInstance;
        anyComponent = <any>component;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get multi input config, when it is passed by input', () => {
        expect(anyComponent.mobileConfig).toEqual(testMobileConfigObject);
    });

    it('should open and close with approve', () => {
        anyComponent._component.mobile = true;
        component.ngOnInit();
        anyComponent._component.openChange.emit(true);
        const spy = jest.spyOn(anyComponent._component, '_dialogApprove');
        fixture.detectChanges();

        expect(anyComponent._dialogService.hasOpenDialogs()).toBe(true);

        fixture.detectChanges();
        component.handleApprove();

        expect(spy).toHaveBeenCalled();
    });

    it('should open and close with dismiss', () => {
        anyComponent._component.mobile = true;
        component.ngOnInit();
        anyComponent._component.openChange.emit(true);
        const spy = jest.spyOn(anyComponent._component, '_dialogDismiss');
        fixture.detectChanges();

        expect(anyComponent._dialogService.hasOpenDialogs()).toBe(true);

        fixture.detectChanges();
        component.handleDismiss();

        expect(spy).toHaveBeenCalled();
    });
});
