import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import illustratedMessageSrc from '!./examples/illustrated-message-example.component.html?raw';
import illustratedMessageTsCode from '!./examples/illustrated-message-example.component.ts?raw';

import illustratedMessageDialogSrc from '!./examples/illustrated-message-dialog-example.component.html?raw';
import illustratedMessageDialogTsCode from '!./examples/illustrated-message-dialog-example.component.ts?raw';

import illustratedMessageSpotSrc from '!./examples/illustrated-message-spot-example.component.html?raw';
import illustratedMessageSpotTsCode from '!./examples/illustrated-message-spot-example.component.ts?raw';

import illustration from '!../../../../assets/images/sapIllus-Dialog-NoMail.svg?raw';
import illustrationSceneNoMail from '!../../../../assets/images/sapIllus-Scene-NoMail.svg?raw';

import illustrationDialogNoMail from '!../../../../assets/images/sapIllus-Dialog-NoMail.svg?raw';

import illustrationSpotNoMail from '!../../../../assets/images/sapIllus-Spot-NoMail.svg?raw';

import illusratedMessageInlineSrc from '!./examples/illustrated-message-inline-example.component.ts?raw';
import illusratedMessageInlineHtmlSrc from '!./examples/illustrated-message-inline-example.component.html?raw';

@Component({
    selector: 'app-illustrated-message',
    templateUrl: './illustrated-message-docs.component.html'
})
export class IllustratedMessageDocsComponent {
    illustratedMessageExample: ExampleFile[] = [
        {
            language: 'html',
            code: illustratedMessageSrc,
            fileName: 'illustrated-message-example'
        },
        {
            language: 'typescript',
            code: illustratedMessageTsCode,
            fileName: 'illustrated-message-example',
            component: 'IllustratedMessageExampleComponent'
        },
        {
            language: 'svg',
            code: illustration,
            fileName: 'sapIllus-Dialog-NoMail',
            path: 'src/assets/images'
        },
        {
            language: 'svg',
            code: illustrationSceneNoMail,
            fileName: 'sapIllus-Scene-NoMail',
            path: 'src/assets/images'
        }
    ];

    illustratedMessageDialogExample: ExampleFile[] = [
        {
            language: 'html',
            code: illustratedMessageDialogSrc,
            fileName: 'illustrated-message-dialog-example'
        },
        {
            language: 'typescript',
            code: illustratedMessageDialogTsCode,
            fileName: 'illustrated-message-dialog-example',
            component: 'IllustratedMessageDialogExampleComponent'
        },
        {
            language: 'svg',
            code: illustrationDialogNoMail,
            fileName: 'sapIllus-Dialog-NoMail',
            path: 'src/assets/images'
        }
    ];

    illustratedMessageSpotExample: ExampleFile[] = [
        {
            language: 'html',
            code: illustratedMessageSpotSrc,
            fileName: 'illustrated-message-spot-example'
        },
        {
            language: 'typescript',
            code: illustratedMessageSpotTsCode,
            fileName: 'illustrated-message-spot-example',
            component: 'IllustratedMessageSpotExampleComponent'
        },
        {
            language: 'svg',
            code: illustrationSpotNoMail,
            fileName: 'sapIllus-Spot-NoMail',
            path: 'src/assets/images'
        }
    ];

    illustratedMessageInlineExample: ExampleFile[] = [
        {
            language: 'html',
            code: illusratedMessageInlineHtmlSrc,
            fileName: 'illustrated-message-inline-example'
        },
        {
            language: 'typescript',
            code: illusratedMessageInlineSrc,
            fileName: 'illustrated-message-inline-example',
            component: 'IllustratedMessageInlineExampleComponent'
        },
        {
            language: 'svg',
            code: illustration,
            fileName: 'sapIllus-Dialog-NoMail',
            path: 'src/assets/images'
        },
        {
            language: 'svg',
            code: illustrationSceneNoMail,
            fileName: 'sapIllus-Scene-NoMail',
            path: 'src/assets/images'
        }
    ];
}
