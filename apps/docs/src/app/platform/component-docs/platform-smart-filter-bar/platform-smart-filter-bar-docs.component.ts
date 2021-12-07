import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as platformBasicMenuSrc from '!raw-loader!./platform-smart-filter-bar-examples/platform-smart-filter-bar-basic-example.component.html';
import * as platformBasicMenuTsCode from '!raw-loader!./platform-smart-filter-bar-examples/platform-smart-filter-bar-basic-example.component.ts';

@Component({
    selector: 'app-smart-filter-bar',
    templateUrl: './platform-smart-filter-bar-docs.component.html'
})
export class PlatformSmartFilterBarDocsComponent {
    menuBasic: ExampleFile[] = [
        {
            language: 'html',
            code: platformBasicMenuSrc,
            fileName: 'platform-menu-basic-example'
        },
        {
            language: 'typescript',
            code: platformBasicMenuTsCode,
            fileName: 'platform-menu-basic-example',
            component: 'PlatformMenuBasicExampleComponent'
        }
    ];
}
