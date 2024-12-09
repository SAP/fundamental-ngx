import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { PlatformMultiInputComponent } from '@fundamental-ngx/platform/form';
import { BaseSmartFilterBarConditionField } from './base-smart-filter-bar-condition-field';

@Component({
    selector: 'fdp-smart-filter-bar-condition-field',
    templateUrl: './smart-filter-bar-condition-field.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [FormsModule, ReactiveFormsModule, PlatformMultiInputComponent, FdTranslatePipe]
})
export class SmartFilterBarConditionFieldComponent extends BaseSmartFilterBarConditionField {}
