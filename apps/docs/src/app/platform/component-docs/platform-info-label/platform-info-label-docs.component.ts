import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as PlatformInfoLableDefaultExample from '!raw-loader!./platform-info-label-example/platform-info-label-example.component.html';
import * as PlatformInfoLableNumericExample from '!raw-loader!./platform-info-label-example/platform-info-label-numeric-example.component.html';
import * as PlatformTextAndIconInfoLableExample from '!raw-loader!./platform-info-label-example/platform-info-label-text-and-icon-example.component.html';
import * as PlatfromInfoLableTextExample from '!raw-loader!./platform-info-label-example/platform-info-label-text-example.component.html';

import * as PlatfromInfoLableAriaLabelExampleScss from '!raw-loader!./platform-info-label-example/platform-info-label-example.component.scss';
import * as PlatfromInfoLableAriaLabelExample from '!raw-loader!./platform-info-label-example/platform-info-label-aria-label-example.component.html';

@Component({
    selector: 'fd-platform-info-label-docs',
    templateUrl: './platform-info-label-docs.component.html'
})
export class PlatformInfoLabelDocsComponent {
    platformDefaultInfoLabelHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: PlatformInfoLableDefaultExample,
            fileName: 'platform-info-label-example'
        }
    ];
    platformTextInfoLabelHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: PlatfromInfoLableTextExample,
            fileName: 'platform-info-label-example'
        }
    ];
    platformTextAndIconInfoLabelHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: PlatformTextAndIconInfoLableExample,
            fileName: 'platform-info-label-example'
        }
    ];
    platformNumericInfoLabelHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: PlatformInfoLableNumericExample,
            fileName: 'platform-info-label-numeric-example'
        }
    ];
    platformAraiaLabelInfoLabelHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: PlatfromInfoLableAriaLabelExample,
            fileName: 'platform-info-label-aria-label-example',
            scssFileCode: PlatfromInfoLableAriaLabelExampleScss
        }
    ];
}
