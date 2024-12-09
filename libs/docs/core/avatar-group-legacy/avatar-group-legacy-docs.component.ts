import { Component } from '@angular/core';

import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets,
    SeparatorComponent
} from '@fundamental-ngx/docs/shared';
import { AvatarGroupLegacyGroupTypeExampleComponent } from './examples/avatar-group-legacy-group-type-example.component';
import { AvatarGroupLegacyIndividualTypeExampleComponent } from './examples/avatar-group-legacy-individual-type-example.component';

const avatarGroupIndividualTs = 'avatar-group-legacy-individual-type-example.component.ts';
const avatarGroupIndividualHtml = 'avatar-group-legacy-individual-type-example.component.html';
const avatarGroupGroupTs = 'avatar-group-legacy-group-type-example.component.ts';
const avatarGroupGroupHtml = 'avatar-group-legacy-group-type-example.component.html';
const avatarGroupDataServiceTs = 'avatar-group-legacy-data-example.service.ts';

@Component({
    selector: 'app-avatar-group-legacy',
    templateUrl: './avatar-group-legacy-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        DescriptionComponent,
        AvatarGroupLegacyIndividualTypeExampleComponent,
        AvatarGroupLegacyGroupTypeExampleComponent
    ]
})
export class AvatarGroupLegacyDocsComponent {
    individualType: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'avatar-group-legacy-individual-type-example',
            code: getAssetFromModuleAssets(avatarGroupIndividualHtml)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(avatarGroupIndividualTs),
            fileName: 'avatar-group-legacy-individual-type-example',
            component: 'AvatarGroupLegacyIndividualTypeExampleComponent'
        },
        {
            language: 'typescript',
            name: 'avatar-group-legacy-data-example.service.ts',
            code: getAssetFromModuleAssets(avatarGroupDataServiceTs),
            fileName: 'avatar-group-legacy-data-example',
            component: 'AvatarGroupLegacyDataExampleService',
            service: true
        }
    ];

    groupType: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'avatar-group-legacy-group-type-example',
            code: getAssetFromModuleAssets(avatarGroupGroupHtml)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(avatarGroupGroupTs),
            fileName: 'avatar-group-legacy-group-type-example',
            component: 'AvatarGroupLegacyGroupTypeExampleComponent'
        },
        {
            language: 'typescript',
            name: 'avatar-group-legacy-data-example.service.ts',
            code: getAssetFromModuleAssets(avatarGroupDataServiceTs),
            fileName: 'avatar-group-legacy-data-example',
            component: 'AvatarGroupLegacyDataExampleService',
            service: true
        }
    ];
}
