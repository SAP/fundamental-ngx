import { Component } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets,
    getExampleFile,
    SeparatorComponent
} from '@fundamental-ngx/docs/shared';
import { AvatarGroupDefaultExampleComponent } from './examples/default/avatar-group-default-example.component';
import { GroupTypeExampleComponent } from './examples/group-type/group-type-example.component';
import { AvatarGroupVerticalExampleComponent } from './examples/vertical/avatar-group-vertical-example.component';

const service = () => ({
    language: 'typescript',
    name: 'avatar-group-data-example.service.ts',
    code: getAssetFromModuleAssets('avatar-group-data-example.service.ts'),
    fileName: 'avatar-group-data-example',
    component: 'AvatarGroupDataExampleService',
    service: true
});

@Component({
    selector: 'app-avatar-group',
    templateUrl: './avatar-group-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        DescriptionComponent,
        AvatarGroupDefaultExampleComponent,
        AvatarGroupVerticalExampleComponent,
        GroupTypeExampleComponent
    ]
})
export class AvatarGroupDocsComponent {
    avatarGroupDefaultExample: ExampleFile[] = [
        getExampleFile('default/avatar-group-default-example.component.html'),
        getExampleFile('default/avatar-group-default-example.component.ts', {
            component: 'AvatarGroupDefaultExampleComponent',
            fileName: 'avatar-group-default-example',
            path: 'default'
        }),
        service()
    ];
    avatarGroupGroupExample: ExampleFile[] = [
        getExampleFile('group-type/group-type-example.component.html'),
        getExampleFile('group-type/group-type-example.component.ts', {
            component: 'GroupTypeExampleComponent',
            fileName: 'avatar-group-group-type-example',
            path: 'group-type'
        }),
        service()
    ];
    verticalAvatarGroupExample: ExampleFile[] = [
        getExampleFile('vertical/avatar-group-vertical-example.component.html'),
        getExampleFile('vertical/avatar-group-vertical-example.component.ts', {
            component: 'AvatarGroupVerticalExampleComponent',
            fileName: 'avatar-group-vertical-example',
            path: 'vertical'
        }),
        service()
    ];
}
