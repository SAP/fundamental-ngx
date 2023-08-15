import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { DialogService } from '@fundamental-ngx/core/dialog';
import { SmartFilterBarService } from '../../smart-filter-bar.service';
import { BaseSmartFilterBarConditionField } from './base-smart-filter-bar-condition-field';

@Component({
    selector: 'fdp-smart-filter-bar-condition-field',
    templateUrl: './smart-filter-bar-condition-field.component.html',
    encapsulation: ViewEncapsulation.None
})
export class SmartFilterBarConditionFieldComponent extends BaseSmartFilterBarConditionField {
    /** @hidden */
    constructor(dialogService: DialogService, smartFilterBarService: SmartFilterBarService, injector: Injector) {
        super(dialogService, smartFilterBarService, injector);
    }
}
