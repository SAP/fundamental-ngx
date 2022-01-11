import { Component } from '@angular/core';
import listCheckboxGroupHtml from '!./platform-checkbox-group-examples/platform-checkbox-group-list.component.html?raw';
import listCheckboxGroupTs from '!./platform-checkbox-group-examples/platform-checkbox-group-list.component.ts?raw';
import listObjectCheckboxGroupHtml from '!./platform-checkbox-group-examples/platform-checkbox-group-list-object.component.html?raw';
import listObjectCheckboxGroupTs from '!./platform-checkbox-group-examples/platform-checkbox-group-list-object.component.ts?raw';
import contentCheckboxGroupHtml from '!./platform-checkbox-group-examples/platform-checkbox-group-content-checkbox.component.html?raw';
import contentCheckboxGroupTs from '!./platform-checkbox-group-examples/platform-checkbox-group-content-checkbox.component.ts?raw';
import checkboxGroupExampleHtml from '!./platform-checkbox-group-examples/platform-checkbox-group-example.component.html?raw';
import checkboxGroupExampleTs from '!./platform-checkbox-group-examples/platform-checkbox-group-examples.component.ts?raw';
import { ExampleFile } from '../../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-checkbox-group',
    templateUrl: './platform-checkbox-group-docs.component.html'
})
export class PlatformCheckboxGroupDocsComponent {
    listCheckboxGroup: ExampleFile[] = [
        {
            language: 'html',
            code: listCheckboxGroupHtml,
            fileName: 'platform-checkbox-group-list'
        },
        {
            language: 'typescript',
            code: listCheckboxGroupTs,
            fileName: 'platform-checkbox-group-list',
            component: 'PlatformCheckboxGroupListComponent'
        }
    ];

    listObjectCheckboxGroup: ExampleFile[] = [
        {
            language: 'html',
            code: listObjectCheckboxGroupHtml,
            fileName: 'platform-checkbox-group-list-object'
        },
        {
            language: 'typescript',
            code: listObjectCheckboxGroupTs,
            fileName: 'platform-checkbox-group-list-object',
            component: 'PlatformCheckboxGroupListObjectComponent'
        }
    ];

    contentCheckboxGroup: ExampleFile[] = [
        {
            language: 'html',
            code: contentCheckboxGroupHtml,
            fileName: 'platform-checkbox-group-content-checkbox'
        },
        {
            language: 'typescript',
            code: contentCheckboxGroupTs,
            fileName: 'platform-checkbox-group-content-checkbox',
            component: 'PlatformCheckboxGroupContentCheckboxComponent'
        }
    ];

    checkboxGroupExample: ExampleFile[] = [
        {
            language: 'html',
            code: checkboxGroupExampleHtml,
            fileName: 'platform-checkbox-group-example'
        },
        {
            language: 'typescript',
            code: checkboxGroupExampleTs,
            fileName: 'platform-checkbox-group-examples',
            component: 'PlatformCheckboxGroupExampleComponent'
        }
    ];
}
