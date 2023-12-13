import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogService } from '@fundamental-ngx/core/dialog';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { PlatformMultiInputComponent } from '@fundamental-ngx/platform/form';
import { SmartFilterBarService } from '../../smart-filter-bar.service';
import { BaseSmartFilterBarConditionField } from './base-smart-filter-bar-condition-field';

@Component({
    selector: 'fdp-smart-filter-bar-condition-field',
    templateUrl: './smart-filter-bar-condition-field.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, PlatformMultiInputComponent, FdTranslatePipe]
})
export class SmartFilterBarConditionFieldComponent extends BaseSmartFilterBarConditionField {
    /** @ignore */
    constructor(dialogService: DialogService, smartFilterBarService: SmartFilterBarService, injector: Injector) {
        super(dialogService, smartFilterBarService, injector);
    }
}
