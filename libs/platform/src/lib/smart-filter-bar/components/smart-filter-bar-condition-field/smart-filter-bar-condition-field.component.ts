import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { DialogService } from '@fundamental-ngx/core/dialog';
import { BaseSmartFilterBarConditionField } from './base-smart-filter-bar-condition-field';
import { SmartFilterBar } from '../../smart-filter-bar.class';

@Component({
    selector: 'fdp-smart-filter-bar-condition-field',
    templateUrl: './smart-filter-bar-condition-field.component.html',
    encapsulation: ViewEncapsulation.None
})
export class SmartFilterBarConditionFieldComponent extends BaseSmartFilterBarConditionField {
    /** @hidden */
    constructor(dialogService: DialogService, smartFilterBar: SmartFilterBar, injector: Injector) {
        super(dialogService, smartFilterBar, injector);
    }
}
