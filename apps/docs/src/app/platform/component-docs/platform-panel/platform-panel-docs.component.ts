import { Component, OnInit } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as panelSimpleExample from '!raw-loader!./platform-panel-examples/platform-panel-simple-example.component.html';
import * as panelSimpleExampleScss from '!raw-loader!./platform-panel-examples/platform-panel-simple-example.scss';

@Component({
    selector: 'app-panel',
    templateUrl: './platform-panel-docs.component.html'
})
export class PlatformPanelDocsComponent implements OnInit {
    panelHtmlSimple: ExampleFile[] = [
        {
            language: 'html',
            code: panelSimpleExample,
            fileName: 'platform-panel-simple-example',
            scssFileCode: panelSimpleExampleScss
        }
    ];

    constructor() {}

    ngOnInit() {}
}
