import { Component } from '@angular/core';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const InfoLableDefaultExample = 'info-label-default-example.component.html';
const InfoLableTextExample = 'info-label-text-example.component.html';
const InfoLabelIconTextExample = 'info-label-text-icon-example.component.html';
const InfoLableNumericIconExample = 'info-label-icon-numeric-example.component.html';

@Component({
    selector: 'app-info-label',
    templateUrl: './info-label-docs.component.html'
})
export class InfoLabelDocsComponent {
    defaultInfoLabelHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(InfoLableDefaultExample),
            fileName: 'Info-label-default-example'
        }
    ];

    InfoLabelTextExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(InfoLableTextExample),
            fileName: 'info-label-text-example'
        }
    ];

    InfoLabelTextIconExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(InfoLabelIconTextExample),
            fileName: 'info-label-text-icon-example'
        }
    ];

    InfoLableNumericIconExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(InfoLableNumericIconExample),
            fileName: 'info-label-icon-numeric-example'
        }
    ];
}
