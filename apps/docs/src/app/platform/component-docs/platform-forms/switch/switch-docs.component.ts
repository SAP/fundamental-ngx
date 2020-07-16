import { Component } from '@angular/core';

import * as switchSizeHtml from '!raw-loader!./switch-examples/switch-sizes-example/switch-sizes-example.component.html';
import * as switchDisableHtml from '!raw-loader!./switch-examples/disabled-switch-example/disabled-switch-example.component.html';
import * as switchDisableTs from '!raw-loader!./switch-examples/disabled-switch-example/disabled-switch-example.component';
import * as switchSemanticHtml from '!raw-loader!./switch-examples/semantic-switch-example/semantic-switch-example.component.html';
import * as switchSemanticTs from '!raw-loader!./switch-examples/semantic-switch-example/semantic-switch-example.component.ts';
import * as switchFormExampleHtml from '!raw-loader!./switch-examples/switch-form-example/switch-forms-example.component.html';
import * as switchFormExampleTs from '!raw-loader!./switch-examples/switch-form-example/switch-forms-example.component.ts';
import { ExampleFile } from '../../../../documentation/core-helpers/code-example/example-file';

@Component({
  selector: 'app-switch',
  templateUrl: './switch-docs.component.html'
})
export class SwitchDocsComponent {
  switchSize: ExampleFile[] = [
    {
      language: 'html',
      code: switchSizeHtml,
      fileName: 'switch-sizes-example'
    }
  ];

  switchDisable: ExampleFile[] = [
    {
      language: 'html',
      code: switchDisableHtml,
      fileName: 'disabled-switch-example'
    },
    {
      language: 'typescript',
      code: switchDisableTs,
      fileName: 'disabled-switch-example'
    }
  ];

  switchSemantic: ExampleFile[] = [
    {
      language: 'html',
      code: switchSemanticHtml,
      fileName: 'semantic-switch-example'
    },
    {
      language: 'typescript',
      code: switchSemanticTs,
      fileName: 'switch-sizes-example'
    }
  ];

  switchFormExample: ExampleFile[] = [
    {
      language: 'html',
      code: switchFormExampleHtml,
      fileName: 'switch-example-disabled-state'
    },
    {
      language: 'typescript',
      code: switchFormExampleTs,
      fileName: 'switch-sizes-example'
    }
  ];
}
