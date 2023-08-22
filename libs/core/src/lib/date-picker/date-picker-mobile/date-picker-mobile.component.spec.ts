import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { DatePickerMobileComponent } from './date-picker-mobile.component';
import { DatePicker } from '../date-picker.model';
import { EventEmitter } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { DateRange } from '@fundamental-ngx/core/calendar';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import { FD_DATE_PICKER_COMPONENT, FD_DATE_PICKER_MOBILE_CONFIG } from '../tokens';
import { FdDate } from '@fundamental-ngx/core/datetime';

class MockDatePickerComponent<D> implements DatePicker<D> {
    selectedDate: Nullable<D>;
    rangeDate: DateRange<D>;
    mobile: boolean;
    mobileConfig = testDatePickerConfigObject;
    isOpenChange = new EventEmitter<boolean>();
    dialogApprove(): void {}
    dialogDismiss(value: D | DateRange<D>): void {
        if (this._isDateRange(value)) {
            this.rangeDate = value;
        } else {
            this.selectedDate = value;
        }
    }
    getSelectedDate(): D | DateRange<D> {
        return this.selectedDate || this.rangeDate;
    }

    /** @hidden */
    private _isDateRange(value: any): value is DateRange<D> {
        return !!value && value.start && value.end;
    }
}

const testDatePickerConfigObject: MobileModeConfig = {
    title: 'title',
    approveButtonText: 'approve',
    cancelButtonText: 'cancel',
    hasCloseButton: true
};

describe('DatePickerMobileComponent', () => {
    let component: DatePickerMobileComponent<any>;
    let anyComponent: any;
    let fixture: ComponentFixture<DatePickerMobileComponent<any>>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, DatePickerMobileComponent],
            providers: [
                {
                    provide: FD_DATE_PICKER_COMPONENT,
                    useClass: MockDatePickerComponent
                },
                {
                    provide: FD_DATE_PICKER_MOBILE_CONFIG,
                    useValue: testDatePickerConfigObject
                }
            ]
        });
        fixture = TestBed.createComponent(DatePickerMobileComponent);
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

    it('should close with cancel and restore original value', () => {
        const originalDate = new FdDate(2011, 10, 10);
        const modifiedDate = new FdDate(2022, 10, 10);
        anyComponent._component.selectedDate = originalDate;
        anyComponent._component.isOpenChange.emit(true);
        jest.spyOn(anyComponent._component, 'dialogDismiss');
        fixture.detectChanges();
        expect(anyComponent._selectedBackup).toEqual(originalDate);
        anyComponent._component.selectedDate = modifiedDate;
        expect(anyComponent._selectedBackup).not.toEqual(modifiedDate);
        component.handleDismiss();
        expect(anyComponent._component.dialogDismiss).toHaveBeenCalledWith(originalDate);
    });
});
