import { Component } from '@angular/core';

import listItemsRadioGroupSrc from '!./platform-radio-group-examples/platform-radio-group-list-items-example.component.html?raw';
import listItemsRadioGroupSrcCode from '!./platform-radio-group-examples/platform-radio-group-list-items-examples.component.ts?raw';
import listRadioGroupSrc from '!./platform-radio-group-examples/platform-radio-group-list-example.component.html?raw';
import listRadioGroupSrcCode from '!./platform-radio-group-examples/platform-radio-group-list-examples.component.ts?raw';
import contentRadioGroupSrc from '!./platform-radio-group-examples/platform-radio-group-content-example.component.html?raw';
import contentRadioGroupSrcCode from '!./platform-radio-group-examples/platform-radio-group-content-examples.component.ts?raw';
import disabledRadioGroupSrc from '!./platform-radio-group-examples/platform-radio-group-disabled-example.component.html?raw';
import disabledRadioGroupSrcCode from '!./platform-radio-group-examples/platform-radio-group-disabled-examples.component.ts?raw';

import { ExampleFile } from '../../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-radio-group',
    templateUrl: './platform-radio-group-docs.component.html'
})
export class PlatformRadioGroupDocsComponent {
    listItemsRadioGroup: ExampleFile[] = [
        {
            language: 'html',
            code: listItemsRadioGroupSrc,
            fileName: 'platform-radio-group-list-items-example'
        },
        {
            language: 'typescript',
            code: listItemsRadioGroupSrcCode,
            fileName: 'platform-radio-group-list-items-example',
            component: 'PlatformRadioGroupListItemsExampleComponent'
        }
    ];

    listRadioGroup: ExampleFile[] = [
        {
            language: 'html',
            code: listRadioGroupSrc,
            fileName: 'platform-radio-group-list-example'
        },
        {
            language: 'typescript',
            code: listRadioGroupSrcCode,
            fileName: 'platform-radio-group-list-example',
            component: 'PlatformRadioGroupListExampleComponent'
        }
    ];

    contentRadioGroup: ExampleFile[] = [
        {
            language: 'html',
            code: contentRadioGroupSrc,
            fileName: 'platform-radio-group-content-example'
        },
        {
            language: 'typescript',
            code: contentRadioGroupSrcCode,
            fileName: 'platform-radio-group-content-example',
            component: 'PlatformRadioGroupContentExampleComponent'
        }
    ];

    disabledRadioGroup: ExampleFile[] = [
        {
            language: 'html',
            code: disabledRadioGroupSrc,
            fileName: 'platform-radio-group-disabled-example'
        },
        {
            language: 'typescript',
            code: disabledRadioGroupSrcCode,
            fileName: 'platform-radio-group-disabled-example',
            component: 'PlatformRadioGroupDisabledExampleComponent'
        }
    ];
}
