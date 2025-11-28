import { Component } from '@angular/core';
import { ComboBox } from '@fundamental-ngx/ui5-webcomponents/combo-box';
import { ComboBoxItem } from '@fundamental-ngx/ui5-webcomponents/combo-box-item';
import { ComboBoxItemGroup } from '@fundamental-ngx/ui5-webcomponents/combo-box-item-group';

@Component({
    selector: 'ui5-combo-box-items-grouping-sample',
    templateUrl: './items-grouping.html',
    standalone: true,
    imports: [ComboBox, ComboBoxItemGroup, ComboBoxItem]
})
export class ComboBoxItemsGroupingSample {}
