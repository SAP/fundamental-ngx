import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const textHyphenationScss = 'text-hyphenation.component.scss';

const textBasicHtml = 'text-basic.component.html';
const textWhitespacesHtml = 'text-whitespaces.component.html';
const textWhitespacesTs = 'text-whitespaces.component.ts';
const textMaxLinesHtml = 'text-max-lines.component.html';
const textMaxLinesTs = 'text-max-lines.component.ts';
const textHyphenationHtml = 'text-hyphenation.component.html';
const textHyphenationTs = 'text-hyphenation.component.ts';
const textExpandableHtml = 'text-expandable.component.html';
const textExpandableTs = 'text-expandable.component.ts';

@Component({
    selector: 'app-input',
    templateUrl: './text-docs.component.html'
})
export class TextDocsComponent {
    textBasic: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(textBasicHtml),
            fileName: 'text-basic'
        }
    ];

    textWhitespaces: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(textWhitespacesHtml),
            fileName: 'text-whitespaces'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(textWhitespacesTs),
            component: 'TextWhitespacesComponent',
            fileName: 'text-whitespaces'
        }
    ];

    textMaxLines: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(textMaxLinesHtml),
            fileName: 'text-max-lines'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(textMaxLinesTs),
            component: 'TextMaxLinesComponent',
            fileName: 'text-max-lines'
        }
    ];

    textHyphenation: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(textHyphenationHtml),
            fileName: 'text-hyphenation',
            scssFileCode: getAssetFromModuleAssets(textHyphenationScss)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(textHyphenationTs),
            component: 'TextHyphenationComponent',
            fileName: 'text-hyphenation'
        }
    ];

    textExpandable: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(textExpandableHtml),
            fileName: 'text-expandable'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(textExpandableTs),
            component: 'TextExpandableComponent',
            fileName: 'text-expandable'
        }
    ];
}
