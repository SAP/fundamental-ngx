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
import { AvatarGroupGroupTypeExampleComponent } from './examples/avatar-group-group-type-example.component';
import { AvatarGroupIndividualTypeExampleComponent } from './examples/avatar-group-individual-type-example.component';

const avatarGroupIndividualTs = 'avatar-group-individual-type-example.component.ts';
const avatarGroupIndividualHtml = 'avatar-group-individual-type-example.component.html';
const avatarGroupGroupTs = 'avatar-group-group-type-example.component.ts';
const avatarGroupGroupHtml = 'avatar-group-group-type-example.component.html';
const avatarGroupDataServiceTs = 'avatar-group-data-example.service.ts';

@Component({
    selector: 'app-avatar-group',
    templateUrl: './avatar-group-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        AvatarGroupIndividualTypeExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        AvatarGroupGroupTypeExampleComponent
    ]
})
export class AvatarGroupDocsComponent {
    individualType: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'avatar-group-individual-type-example',
            code: getAssetFromModuleAssets(avatarGroupIndividualHtml)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(avatarGroupIndividualTs),
            fileName: 'avatar-group-individual-type-example',
            component: 'AvatarGroupIndividualTypeExampleComponent'
        },
        {
            language: 'typescript',
            name: 'avatar-group-data-example.service.ts',
            code: getAssetFromModuleAssets(avatarGroupDataServiceTs),
            fileName: 'avatar-group-data-example',
            component: 'AvatarGroupDataExampleService',
            service: true
        }
    ];

    groupType: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'avatar-group-group-type-example',
            code: getAssetFromModuleAssets(avatarGroupGroupHtml)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(avatarGroupGroupTs),
            fileName: 'avatar-group-group-type-example',
            component: 'AvatarGroupGroupTypeExampleComponent'
        },
        {
            language: 'typescript',
            name: 'avatar-group-data-example.service.ts',
            code: getAssetFromModuleAssets(avatarGroupDataServiceTs),
            fileName: 'avatar-group-data-example',
            component: 'AvatarGroupDataExampleService',
            service: true
        }
    ];
}
