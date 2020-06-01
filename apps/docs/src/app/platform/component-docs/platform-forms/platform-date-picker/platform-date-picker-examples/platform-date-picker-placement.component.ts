/**
 * This approach has been taken from core/datepicker implementation.
 * Some part of code has been modified to integrate platform capabilities.
 */
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'fdp-date-picker-placement',
    template: `
        <fdp-form-group #ffg [formGroup]="datePickerForm" (onSubmit)="save(ffg)" [multiLayout]="true">
            <fdp-form-field
                #ffl1
                [id]="'birthday'"
                zone="zLeft"
                rank="1"
                [required]="true"
                [label]="'Placement is Top End:'"
                [placeholder]="'Enter your birthday'"
            >
                <fdp-date-picker
                    [name]="'birthday'"
                    [type]="'single'"
                    [format]="'dd/MM/yyyy'"
                    [contentDensity]="'compact'"
                    [allowNull]="false"
                    [placement]="'top-end'"
                    [formControl]="ffl1.formControl"
                >
                </fdp-date-picker>
            </fdp-form-field>

            <fdp-form-field
                #ffl2
                [id]="'birthday1'"
                zone="zRight"
                rank="1"
                [required]="true"
                [label]="'Placement is Bottom End:'"
                [placeholder]="'Enter your birthday'"
            >
                <fdp-date-picker
                    [name]="'birthday1'"
                    [type]="'single'"
                    [format]="'dd/MM/yyyy'"
                    [contentDensity]="'compact'"
                    [allowNull]="false"
                    [placement]="'bottom-end'"
                    [formControl]="ffl2.formControl"
                >
                </fdp-date-picker>
            </fdp-form-field>

            <fdp-form-field
                #ffl3
                [id]="'birthday2'"
                zone="zLeft"
                rank="2"
                [required]="true"
                [label]="'Placement is Top Start:'"
                [placeholder]="'Enter your birthday'"
            >
                <fdp-date-picker
                    [name]="'birthday2'"
                    [type]="'single'"
                    [format]="'dd/MM/yyyy'"
                    [contentDensity]="'compact'"
                    [allowNull]="false"
                    [placement]="'top-start'"
                    [formControl]="ffl3.formControl"
                >
                </fdp-date-picker>
            </fdp-form-field>

            <fdp-form-field
                #ffl4
                [id]="'birthday3'"
                zone="zRight"
                rank="2"
                [required]="true"
                [label]="'Placement is Bottom Start:'"
                [placeholder]="'Enter your birthday'"
            >
                <fdp-date-picker
                    [name]="'birthday3'"
                    [type]="'single'"
                    [format]="'dd/MM/yyyy'"
                    [contentDensity]="'compact'"
                    [allowNull]="false"
                    [placement]="'bottom-start'"
                    [formControl]="ffl4.formControl"
                >
                </fdp-date-picker>
            </fdp-form-field>

            <ng-template #i18n let-errors>
                <ng-container *ngIf="errors.required">
                    <span>This is invalid(error) DatePicker</span>
                </ng-container>
            </ng-template>
        </fdp-form-group>
    `
})
export class PlatformDatePickerPlacementComponent {
    data: Object = {};
    datePickerForm: FormGroup = new FormGroup({});

    public save(event: any) {}
}
