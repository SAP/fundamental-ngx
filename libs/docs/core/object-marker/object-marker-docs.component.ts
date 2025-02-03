import { Component } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { ObjectMarkerClickableExampleComponent } from './examples/object-marker-clickable-example.component';
import {
    ObjectMarkerExampleComponent,
    ObjectMarkerIconAndTextExampleComponent,
    ObjectMarkerTextExampleComponent
} from './examples/object-marker-example.component';

const ObjectMarkerExample = 'object-marker-example.component.html';
const ObjectMarkerIconandText = 'object-marker-Icon-text-example.component.html';
const ObjectMarkerClickable = 'object-marker-clickable-example.component.html';
const ObjectMarkerText = 'object-marker-text-example.component.html';
const ObjectMarkerClickAble = 'object-marker-clickable-example.component.ts';

@Component({
    selector: 'fd-object-marker-docs',
    templateUrl: './object-marker-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        ObjectMarkerExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        ObjectMarkerTextExampleComponent,
        ObjectMarkerIconAndTextExampleComponent,
        ObjectMarkerClickableExampleComponent
    ]
})
export class ObjectMarkerDocsComponent {
    objectMarkerIconOnly: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(ObjectMarkerExample),
            fileName: 'object-marker-example'
        }
    ];
    objectMarkerIconandText: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(ObjectMarkerIconandText),
            fileName: 'object-marker-example'
        }
    ];
    objectMarkerText: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(ObjectMarkerText),
            fileName: 'object-marker-example'
        }
    ];
    objectMarkerClickable: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(ObjectMarkerClickable),
            fileName: 'object-marker-clickable-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(ObjectMarkerClickAble),
            fileName: 'object-marker-clickable-example',
            component: 'ObjectMarkerClickableExampleComponent'
        }
    ];
}
