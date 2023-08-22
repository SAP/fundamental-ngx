import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { DatetimePickerMobileComponent } from './datetime-picker-mobile.component';
import { DateTimePicker } from '../datetime-picker.model';
import { EventEmitter } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import { FD_DATETIME_PICKER_COMPONENT, FD_DATETIME_PICKER_MOBILE_CONFIG } from '../tokens';

class MockDateTimePickerComponent<D> implements DateTimePicker<D> {
    date: Nullable<D>;
    isOpenChange = new EventEmitter<boolean>();
    dialogApprove(): void {}
    dialogDismiss(value: Nullable<D>): void {}
    mobile: boolean;
    mobileConfig = testDatePickerConfigObject;
}

const testDatePickerConfigObject: MobileModeConfig = {
    title: 'title',
    approveButtonText: 'approve',
    cancelButtonText: 'cancel',
    hasCloseButton: true
};

describe('DatetimePickerMobileComponent', () => {
    let component: DatetimePickerMobileComponent<any>;
    let anyComponent: any;
    let fixture: ComponentFixture<DatetimePickerMobileComponent<any>>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, DatetimePickerMobileComponent],
            providers: [
                {
                    provide: FD_DATETIME_PICKER_COMPONENT,
                    useClass: MockDateTimePickerComponent
                },
                {
                    provide: FD_DATETIME_PICKER_MOBILE_CONFIG,
                    useValue: testDatePickerConfigObject
                }
            ]
        });
        fixture = TestBed.createComponent(DatetimePickerMobileComponent);
        component = fixture.componentInstance;
        anyComponent = component;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should getdate picker config, when it is passed by input', () => {
        expect(component.mobileConfig).toEqual(testDatePickerConfigObject);
    });

    it('should open and close with approve', () => {
        anyComponent._component.mobile = true;
        anyComponent._component.isOpenChange.emit(true);
        jest.spyOn(anyComponent._component, 'dialogApprove');
        fixture.detectChanges();
        expect(anyComponent._dialogService.hasOpenDialogs()).toBe(true);
        fixture.detectChanges();
        component.handleApprove();
        expect(anyComponent._component.dialogApprove).toHaveBeenCalled();
    });
});
