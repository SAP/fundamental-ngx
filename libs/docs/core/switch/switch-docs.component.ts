import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { SwitchComponent } from '@fundamental-ngx/core/switch';
import { Schema, SchemaFactoryService } from '@fundamental-ngx/docs/schema';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    PlayGroundComponent,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { DisabledSwitchExampleComponent } from './examples/disabled-switch-example/disabled-switch-example.component';
import { SemanticSwitchExampleComponent } from './examples/semantic-switch-example/semantic-switch-example.component';
import { SwitchBindingExampleComponent } from './examples/switch-binding-example/switch-binding-example.component';
import { SwitchFormsExampleComponent } from './examples/switch-form-example/switch-forms-example.component';
import { SwitchSizesExampleComponent } from './examples/switch-sizes-example/switch-sizes-example.component';

const switchSizeExampleScssCode = 'switch-sizes-example/switch-sizes-example.component.scss';
const switchDisableExampleScssCode = 'disabled-switch-example/disabled-switch-example.component.scss';
const switchBindingExampleScssCode = 'switch-binding-example/switch-binding-example.component.scss';

const switchFormExampleScssCode = 'switch-form-example/switch-forms-example.component.scss';

const switchSizeExample = 'switch-sizes-example/switch-sizes-example.component.html';
const switchSizeExampleTsCode = 'switch-sizes-example/switch-sizes-example.component.ts';
const switchDisableExample = 'disabled-switch-example/disabled-switch-example.component.html';
const switchDisableExampleTsCode = 'disabled-switch-example/disabled-switch-example.component.ts';
const switchBindingExampleHtml = 'switch-binding-example/switch-binding-example.component.html';
const switchBindingExampleTsCode = 'switch-binding-example/switch-binding-example.component.ts';
const switchFormExampleHtmlSrc = 'switch-form-example/switch-forms-example.component.html';
const switchFormExampleTsCode = 'switch-form-example/switch-forms-example.component.ts';
const semanticSwitchExampleHtml = 'semantic-switch-example/semantic-switch-example.component.html';
const semanticSwitchExampleTs = 'semantic-switch-example/semantic-switch-example.component.ts';

@Component({
    selector: 'app-switch',
    templateUrl: './switch-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        SwitchSizesExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        DisabledSwitchExampleComponent,
        SwitchBindingExampleComponent,
        SemanticSwitchExampleComponent,
        SwitchFormsExampleComponent,
        PlayGroundComponent,
        SwitchComponent,
        FormsModule,
        ContentDensityDirective
    ]
})
export class SwitchDocsComponent {
    schema: Schema;

    data: any = {
        properties: {
            disabled: false,
            checked: false,
            compact: true,
            semantic: false
        }
    };

    switchSize: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'switch-sizes-example',
            code: getAssetFromModuleAssets(switchSizeExample),
            typescriptFileCode: getAssetFromModuleAssets(switchSizeExampleTsCode),
            component: 'SwitchSizesExampleComponent',
            scssFileCode: getAssetFromModuleAssets(switchSizeExampleScssCode)
        }
    ];

    switchDisable: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'disabled-switch-example',
            code: getAssetFromModuleAssets(switchDisableExample),
            typescriptFileCode: getAssetFromModuleAssets(switchDisableExampleTsCode),
            component: 'DisabledSwitchExampleComponent',
            scssFileCode: getAssetFromModuleAssets(switchDisableExampleScssCode)
        }
    ];

    switchBinding: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'switch-binding-example',
            code: getAssetFromModuleAssets(switchBindingExampleHtml),
            typescriptFileCode: getAssetFromModuleAssets(switchBindingExampleTsCode),
            component: 'SwitchBindingExampleComponent',
            scssFileCode: getAssetFromModuleAssets(switchBindingExampleScssCode)
        }
    ];

    switchSemantic: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'semantic-switch-example',
            code: getAssetFromModuleAssets(semanticSwitchExampleHtml),
            typescriptFileCode: getAssetFromModuleAssets(semanticSwitchExampleTs),
            component: 'SemanticSwitchExampleComponent'
        }
    ];

    switchFormExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'switch-forms-example',
            code: getAssetFromModuleAssets(switchFormExampleHtmlSrc),
            scssFileCode: getAssetFromModuleAssets(switchFormExampleScssCode)
        },
        {
            language: 'typescript',
            fileName: 'switch-forms-example',
            code: getAssetFromModuleAssets(switchFormExampleTsCode),
            component: 'SwitchFormsExampleComponent'
        }
    ];

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('switch');
    }

    onSchemaValues(data): void {
        this.data = data;
    }
}
