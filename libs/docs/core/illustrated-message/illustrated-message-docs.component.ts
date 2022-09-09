import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets, getAsset } from '@fundamental-ngx/docs/shared';

const illustratedMessageSrc = 'illustrated-message-example.component.html';
const illustratedMessageTsCode = 'illustrated-message-example.component.ts';

const illustratedMessageDialogSrc = 'illustrated-message-dialog-example.component.html';
const illustratedMessageDialogTsCode = 'illustrated-message-dialog-example.component.ts';

const illustratedMessageSpotSrc = 'illustrated-message-spot-example.component.html';
const illustratedMessageSpotTsCode = 'illustrated-message-spot-example.component.ts';

// import illustration from '!../../../../../../apps/docs/src/assets/images/sapIllus-Dialog-NoMail.svg?raw';
// import illustrationDialogNoMail from '!../../../../../../apps/docs/src/assets/images/sapIllus-Dialog-NoMail.svg?raw';
// import illustrationSceneNoMail from '!../../../../../../apps/docs/src/assets/images/sapIllus-Scene-NoMail.svg?raw';
//
// import illustrationSpotNoMail from '!../../../../../../apps/docs/src/assets/images/sapIllus-Spot-NoMail.svg?raw';
const illusratedMessageInlineSrc = 'illustrated-message-inline-example.component.ts';
const illusratedMessageInlineHtmlSrc = 'illustrated-message-inline-example.component.html';

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
            code: 'illustration',
            fileName: 'sapIllus-Dialog-NoMail',
            path: 'src/assets/images'
        },
        {
            language: 'svg',
            code: 'illustrationSceneNoMail',
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
            code: 'illustrationDialogNoMail',
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
            code: 'illustrationSpotNoMail',
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
            code: 'illustration',
            fileName: 'sapIllus-Dialog-NoMail',
            path: 'src/assets/images'
        },
        {
            language: 'svg',
            code: 'illustrationSceneNoMail',
            fileName: 'sapIllus-Scene-NoMail',
            path: 'src/assets/images'
        }
    ];
}
