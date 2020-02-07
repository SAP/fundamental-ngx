import { Component } from '@angular/core';

import * as BusyIndicatorHtml from '!raw-loader!./examples/busy-indicator-basic-example.component.html';
import * as BusyIndicatorTscode from '!raw-loader!./examples/busy-indicator-basic-example.component.ts';
import * as BusyIndicatorSwitchHtml from '!raw-loader!./examples/busy-indicator-toggle-example.component.html';
import * as BusyIndicatorSwitchTscode from '!raw-loader!./examples/busy-indicator-toggle-example.component.ts';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-busy-indicator-docs',
    templateUrl: './busy-indicator-docs.component.html',
})
export class BusyIndicatorDocsComponent {
    BusyIndicatorBasicExample: ExampleFile[] = [
        {
            language: 'html',
            code: BusyIndicatorHtml,
            fileName: 'busy-indicator-basic-example',
        }
    ];
    BusyIndicatorSwitchExample: ExampleFile[] = [
        {
            language: 'html',
<<<<<<< HEAD
            code: BusyIndicatorToggleHtml,
            fileName: 'busy-indicator-toggle-example',
=======
            code: BusyIndicatorSwitchHtml,
            fileName: 'busy-indicator-toggle-example',
            typescriptFileCode: BusyIndicatorSwitchTscode,
            component: 'BusyIndicatorSwitchExampleComponent'
>>>>>>> change naming
        }
    ];
}
