import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as templateBasedTs from '!raw-loader!./examples/template-based/template-based-message-box-example.component.ts';
import * as templateBasedHtml from '!raw-loader!./examples/template-based/template-based-message-box-example.component.html';

import * as componentBasedTs from '!raw-loader!./examples/component-based/component-based-message-box-example.component.ts';
import * as componentBasedExampleTs from '!raw-loader!./examples/component-based/message-box-example.component.ts';

import * as objectBasedTs from '!raw-loader!./examples/object-based/object-based-message-box-example.component.ts';
import * as objectBasedHtml from '!raw-loader!./examples/object-based/object-based-message-box-example.component.html';

import * as semanticTypesTs from '!raw-loader!./examples/semantic-types/semantic-types-example.component.ts';
import * as semanticTypesHtml from '!raw-loader!./examples/semantic-types/semantic-types-example.component.html';

import * as customPositionHtml from '!raw-loader!./examples/custom-position/message-box-position-example.component.html';
import * as customPositionTs from '!raw-loader!./examples/custom-position/message-box-position-example.component.ts';

import * as mobileModeHtml from '!raw-loader!./examples/mobile-mode/message-box-mobile-example.component.html';
import * as mobileModeTs from '!raw-loader!./examples/mobile-mode/message-box-mobile-example.component.ts';

import * as complexTemplateTs from '!raw-loader!./examples/complex-template/complex-template-example.component.ts';
import * as complexTemplateExampleTs from '!raw-loader!./examples/complex-template/message-box-complex-example.component.ts';

@Component({
    selector: 'app-message-box-docs',
    templateUrl: './message-box-docs.component.html'
})
export class MessageBoxDocsComponent {
    objectBased: ExampleFile[] = [
        {
            language: 'html',
            code: objectBasedHtml,
            fileName: 'object-based-message-box-example'
        },
        {
            language: 'typescript',
            code: objectBasedTs,
            fileName: 'object-based-message-box-example',
            component: 'ObjectBasedMessageBoxExampleComponent'
        }
    ];

    templateBased: ExampleFile[] = [
        {
            language: 'html',
            code: templateBasedHtml,
            fileName: 'template-based-message-box-example'
        },
        {
            language: 'typescript',
            code: templateBasedTs,
            fileName: 'template-based-message-box-example',
            component: 'TemplateBasedMessageBoxExampleComponent'
        }
    ];

    componentBased: ExampleFile[] = [
        {
            language: 'typescript',
            code: componentBasedExampleTs,
            name: 'Message box content',
            fileName: 'message-box-example',
            component: 'MessageBoxExampleComponent',
            entryComponent: true
        },
        {
            language: 'typescript',
            code: componentBasedTs,
            entryComponent: true,
            main: true,
            fileName: 'component-based-message-box-example',
            component: 'ComponentBasedMessageBoxExampleComponent'
        }
    ];

    semanticTypes: ExampleFile[] = [
        {
            language: 'html',
            code: semanticTypesHtml,
            fileName: 'semantic-types-example'
        },
        {
            language: 'typescript',
            code: semanticTypesTs,
            fileName: 'semantic-types-example',
            component: 'SemanticTypesExampleComponent'
        }
    ];

    mobileMode: ExampleFile[] = [
        {
            language: 'html',
            code: mobileModeHtml,
            fileName: 'message-box-mobile-example'
        },
        {
            language: 'typescript',
            code: mobileModeTs,
            fileName: 'message-box-mobile-example',
            component: 'MessageBoxMobileExampleComponent'
        }
    ];

    customPosition: ExampleFile[] = [
        {
            language: 'html',
            code: customPositionHtml,
            fileName: 'message-box-position-example'
        },
        {
            language: 'typescript',
            code: customPositionTs,
            fileName: 'message-box-position-example',
            component: 'MessageBoxPositionExampleComponent'
        }
    ];

    complexTemplate: ExampleFile[] = [
        {
            language: 'typescript',
            code: complexTemplateTs,
            name: 'Message box complex',
            fileName: 'complex-template-example',
            component: 'ComplexTemplateExampleComponent',
            main: true,
            entryComponent: true
        },
        {
            language: 'typescript',
            code: complexTemplateExampleTs,
            entryComponent: true,
            fileName: 'message-box-complex-example',
            component: 'MessageBoxComplexExampleComponent'
        }
    ];
}
