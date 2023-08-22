import { Component } from '@angular/core';
import { Schema, SchemaFactoryService } from '@fundamental-ngx/docs/schema';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { PlayGroundComponent } from '../../shared/src/lib/core-helpers/playground/playground.component';
import { InputGroupFormExampleComponent } from './examples/input-group-form-example/input-group-form-example.component';
import { InputGroupSearchExampleComponent } from './examples/input-group-search-example/input-group-search-example.component';
import { SeparatorComponent } from '../../shared/src/lib/core-helpers/seperator/seperator.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import {
    InputGroupTextExampleComponent,
    InputGroupIconExampleComponent,
    InputGroupButtonExampleComponent,
    InputGroupTextCompactExampleComponent,
    InputGroupComplexExampleComponent,
    InputGroupStatesExampleComponent
} from './examples/input-group-examples.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

const inputGroupButtonSrc = 'input-group-button-example.component.html';
const inputGroupIconSrc = 'input-group-icon-example.component.html';
const inputGroupSearchSrc = 'input-group-search-example/input-group-search-example.component.html';
const inputGroupSearchSrcTs = 'input-group-search-example/input-group-search-example.component.ts';
const inputGroupTextSrc = 'input-group-text-example.component.html';
const inputGroupTextCompactSrc = 'input-group-text-compact-example.component.html';
const formInputTsSrc = 'input-group-form-example/input-group-form-example.component.ts';
const formInputHtmlSrc = 'input-group-form-example/input-group-form-example.component.html';
const complexInputHtml = 'input-group-complex-example.component.html';
const statesInputHtml = 'input-group-states-example.component.html';

@Component({
    selector: 'app-input-group',
    templateUrl: './input-group-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        InputGroupTextExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        InputGroupIconExampleComponent,
        InputGroupButtonExampleComponent,
        InputGroupTextCompactExampleComponent,
        InputGroupSearchExampleComponent,
        InputGroupFormExampleComponent,
        InputGroupComplexExampleComponent,
        InputGroupStatesExampleComponent,
        PlayGroundComponent,
        InputGroupModule,
        FormsModule
    ]
})
export class InputGroupDocsComponent {
    schema: Schema;
    data: any = {
        properties: {
            placement: 'after',
            inline: false,
            placeholder: '',
            ngModel: '10000',
            addOnType: 'text',
            addOnText: '€',
            state: '',
            glyph: '',
            button: false
        },
        state: {
            disabled: false
        }
    };

    textAddOn: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(inputGroupTextSrc),
            fileName: 'input-group-text-example'
        }
    ];

    iconAddOn: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(inputGroupIconSrc),
            fileName: 'input-group-icon-example'
        }
    ];

    buttonIconAddOn: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(inputGroupButtonSrc),
            fileName: 'input-group-button-example'
        }
    ];

    searchInput: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(inputGroupSearchSrc),
            fileName: 'input-group-search-example',
            typescriptFileCode: inputGroupSearchSrcTs,
            component: 'InputGroupSearchExampleComponent'
        }
    ];

    textCompact: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(inputGroupTextCompactSrc),
            fileName: 'input-group-compact-example'
        }
    ];

    formInput: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(formInputHtmlSrc),
            fileName: 'input-group-form-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(formInputTsSrc),
            fileName: 'input-group-form-example',
            component: 'InputGroupFormExampleComponent'
        }
    ];

    complexInput: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(complexInputHtml),
            fileName: 'input-group-complex-example'
        }
    ];

    statesInput: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(statesInputHtml),
            fileName: 'input-group-states-example'
        }
    ];

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('inputGroup');
    }

    onSchemaValues(data): void {
        this.data = data;
    }
}
