import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets, getAsset } from '@fundamental-ngx/docs/shared';

const illustratedMessageSrc = 'illustrated-message-example.component.html';
const illustratedMessageTsCode = 'illustrated-message-example.component.ts';

const illustratedMessageDialogSrc = 'illustrated-message-dialog-example.component.html';
const illustratedMessageDialogTsCode = 'illustrated-message-dialog-example.component.ts';

const illustratedMessageSpotSrc = 'illustrated-message-spot-example.component.html';
const illustratedMessageSpotTsCode = 'illustrated-message-spot-example.component.ts';

const illustratedMessageDotSrc = 'illustrated-message-dot-example.component.html';
const illustratedMessageDotTsCode = 'illustrated-message-dot-example.component.ts';

const illustration = 'assets/images/sapIllus-Dialog-NoMail.svg';
const illustrationDialogNoMail = 'assets/images/sapIllus-Dialog-NoMail.svg';
const illustrationSceneNoMail = 'assets/images/sapIllus-Scene-NoMail.svg';

const illustrationSpotNoMail = 'assets/images/sapIllus-Spot-NoMail.svg';
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
            code: getAssetFromModuleAssets(illustratedMessageSrc),
            fileName: 'illustrated-message-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(illustratedMessageTsCode),
            fileName: 'illustrated-message-example',
            component: 'IllustratedMessageExampleComponent'
        },
        {
            language: 'svg',
            code: getAsset(illustration),
            fileName: 'sapIllus-Dialog-NoMail',
            path: 'src/assets/images'
        },
        {
            language: 'svg',
            code: getAsset(illustrationSceneNoMail),
            fileName: 'sapIllus-Scene-NoMail',
            path: 'src/assets/images'
        }
    ];

    illustratedMessageDialogExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(illustratedMessageDialogSrc),
            fileName: 'illustrated-message-dialog-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(illustratedMessageDialogTsCode),
            fileName: 'illustrated-message-dialog-example',
            component: 'IllustratedMessageDialogExampleComponent'
        },
        {
            language: 'svg',
            code: getAsset(illustrationDialogNoMail),
            fileName: 'sapIllus-Dialog-NoMail',
            path: 'src/assets/images'
        }
    ];

    illustratedMessageSpotExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(illustratedMessageSpotSrc),
            fileName: 'illustrated-message-spot-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(illustratedMessageSpotTsCode),
            fileName: 'illustrated-message-spot-example',
            component: 'IllustratedMessageSpotExampleComponent'
        },
        {
            language: 'svg',
            code: getAsset(illustrationSpotNoMail),
            fileName: 'sapIllus-Spot-NoMail',
            path: 'src/assets/images'
        }
    ];

    illustratedMessageDotExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(illustratedMessageDotSrc),
            fileName: 'illustrated-message-dot-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(illustratedMessageDotTsCode),
            fileName: 'illustrated-message-dot-example',
            component: 'IllustratedMessageDotExampleComponent'
        },
        {
            language: 'svg',
            code: getAsset(illustrationSpotNoMail),
            fileName: 'sapIllus-Spot-NoMail',
            path: 'src/assets/images'
        }
    ];

    illustratedMessageInlineExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(illusratedMessageInlineHtmlSrc),
            fileName: 'illustrated-message-inline-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(illusratedMessageInlineSrc),
            fileName: 'illustrated-message-inline-example',
            component: 'IllustratedMessageInlineExampleComponent'
        },
        {
            language: 'svg',
            code: getAsset(illustration),
            fileName: 'sapIllus-Dialog-NoMail',
            path: 'src/assets/images'
        },
        {
            language: 'svg',
            code: getAsset(illustrationSceneNoMail),
            fileName: 'sapIllus-Scene-NoMail',
            path: 'src/assets/images'
        }
    ];
}
