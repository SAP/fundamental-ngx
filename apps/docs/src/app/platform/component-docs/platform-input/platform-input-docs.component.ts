import { Component, OnInit } from '@angular/core';
import * as platformInputDefaultTypesSrc from '!raw-loader!./platform-input-example/platform-input-example.component.html';
import * as platformInputDefaultTypesTsSrc from '!raw-loader!./platform-input-example/platform-input-example.component.ts';
import * as platformInputValidationTypesSrc from '!raw-loader!./platform-input-example/platform-input-validation-example.component.html';
import * as platformInputValidationTypesTsSrc from '!raw-loader!./platform-input-example/platform-input-validation-example.component.ts';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
  selector: 'fd-platform-input-docs',
  templateUrl: './platform-input-docs.component.html'
})
export class PlatformInputDocsComponent implements OnInit {

    defaultInputType: ExampleFile[] = [
        {
            language: 'html',
            code: platformInputDefaultTypesSrc,
            fileName: 'platform-input-example'
        },
        {
            language: 'typescript',
            code: platformInputDefaultTypesTsSrc,
            fileName: 'platform-input-example',
            component: 'PlatformInputDefaultExampleComponent'
        }
    ];
    validationInputType: ExampleFile[] = [
        {
            language: 'html',
            code: platformInputValidationTypesSrc,
            fileName: 'platform-input-validation-example'
        },
        {
            language: 'typescript',
            code: platformInputValidationTypesTsSrc,
            fileName: 'platform-input-validation-example',
            component: 'PlatformInputValidationExampleComponent'
        }
    ];


  constructor() { }

  ngOnInit(): void {
  }

}
