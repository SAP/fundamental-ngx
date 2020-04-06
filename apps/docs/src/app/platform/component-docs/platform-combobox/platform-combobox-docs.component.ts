import { Component, OnInit } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as platformComboboxDefaultTypesSrc from '!raw-loader!./platform-combobox-examples/platform-combobox-types-default-example.component.html';
import * as platformComboboxDefaultTypesTsSrc from '!raw-loader!./platform-combobox-examples/platform-combobox-types-default-example.component.ts';
import * as platformComboboxAddressTypesTsSrc from '!raw-loader!./platform-combobox-examples/address.ts';
import * as platformComboboxAddressCSVTypesTsSrc from '!raw-loader!./platform-combobox-examples/addressCSV.ts';


@Component({
    selector: 'fd-combobox-docs',
    templateUrl: './platform-combobox-docs.component.html'
})
export class PlatformComboboxDocsComponent {
    defaultComboboxType: ExampleFile[] = [
        {
            language: 'html',
            code: platformComboboxDefaultTypesSrc,
            fileName: 'platform-combobox-types-default-example'
        },
        {
            language: 'typescript',
            code: platformComboboxDefaultTypesTsSrc,
            fileName: 'platform-combobox-types-default-example',
            component: 'PlatformComboboxTypesDefaultExampleComponent'
        },
        {
            language: 'Address Class',
            code: platformComboboxAddressTypesTsSrc,
            fileName: 'address',
            component: 'Address'
        },
        {
            language: 'CSV file',
            code: platformComboboxAddressCSVTypesTsSrc,
            fileName: 'addressCSV',
            component: 'AddressCSV'
        }
    ];
}
