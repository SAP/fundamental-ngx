/**
 * This approach has been taken from core/datepicker implementation.
 * Some part of code has been modified to integrate platform capabilities.
 */
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FdDate } from '@fundamental-ngx/core';

@Component({
    selector: 'fdp-date-picker-disablefn',
    template: `
        <fdp-form-group #ffg [formGroup]="datePickerForm" (onSubmit)="save(ffg)" [multiLayout]="true">
            <fdp-form-field
                #ffl1
                [id]="'birthday'"
                zone="zLeft"
                rank="1"
                [required]="true"
                [label]="'Birthday:'"
                [placeholder]="'Enter your birthday'"
            >
                <fdp-date-picker
                    [name]="'birthday'"
                    [type]="'single'"
                    [format]="'dd/MM/yyyy'"
                    [contentDensity]="'compact'"
                    [allowNull]="false"
                    [disableFunction]="disableFunction"
                    [formControl]="ffl1.formControl"
                >
                </fdp-date-picker>
            </fdp-form-field>

            <fdp-form-field #ffl2 [id]="'examdate'" [label]="'Exam Date:'" zone="zRight" rank="1" [required]="true">
                <fdp-date-picker
                    [name]="'examdate'"
                    [type]="'range'"
                    [format]="'MM/dd/yyyy'"
                    [allowNull]="false"
                    [contentDensity]="'compact'"
                    [placeholder]="'Enter dates'"
                    [disableRangeStartFunction]="disabledStartFunction"
                    [disableRangeEndFunction]="disabledEndFunction"
                    [formControl]="ffl2.formControl"
                >
                </fdp-date-picker>
            </fdp-form-field>

            <ng-template #i18n let-errors>
                <ng-container *ngIf="errors.required">
                    <span>This is invalid(error) DatePicker</span>
                </ng-container>
            </ng-template>
        </fdp-form-group>

        <p>Birthday: {{ datePickerForm.get('birthday').value?.toDateString() }}</p>
        <p>Exam Start Date: {{ datePickerForm.get('examdate').value?.start.toDateString() }}</p>
        <span>Exam End Date: {{ datePickerForm.get('examdate').value?.end.toDateString() }}</span>
    `
})
export class PlatformDisabledFuncDatePickerComponent {
    data: Object = {};
    datePickerForm: FormGroup = new FormGroup({});

    public save(event: any) {}

    disableFunction = (fdDate: FdDate): boolean => {
        return fdDate && fdDate.getTimeStamp() < FdDate.getToday().getTimeStamp();
    };

    disabledEndFunction = (fdDate: FdDate): boolean => {
        return (
            FdDate.getToday().getTimeStamp() > fdDate.getTimeStamp() ||
            fdDate.getTimeStamp() > this._getFutureDate(FdDate.getToday()).getTimeStamp()
        );
    };

    disabledStartFunction = (fdDate: FdDate): boolean => {
        return (
            FdDate.getToday().getTimeStamp() > fdDate.getTimeStamp() ||
            fdDate.getTimeStamp() > this._getFutureDate(FdDate.getToday()).getTimeStamp()
        );
    };

    /** Get date for next 14 days. */
    private _getFutureDate(fdDate: FdDate): FdDate {
        const amountOfDaysInFuture: number = 14;
        for (let i = 0; i < amountOfDaysInFuture; i++) {
            fdDate = fdDate.nextDay();
        }
        return fdDate;
    }
}
