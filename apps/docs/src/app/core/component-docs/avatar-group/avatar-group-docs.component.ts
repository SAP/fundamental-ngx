import { Component } from '@angular/core';

import avatarGroupIndividualTs from '!./examples/avatar-group-individual-type-example.component.ts?raw';
import avatarGroupIndividualHtml from '!./examples/avatar-group-individual-type-example.component.html?raw';
import avatarGroupGroupTs from '!./examples/avatar-group-group-type-example.component.ts?raw';
import avatarGroupGroupHtml from '!./examples/avatar-group-group-type-example.component.html?raw';
import avatarGroupDataServiceTs from '!./examples/avatar-group-data-example.service.ts?raw';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-avatar-group',
    templateUrl: './avatar-group-docs.component.html'
})
export class AvatarGroupDocsComponent {
    individualType: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'avatar-group-individual-type-example',
            code: avatarGroupIndividualHtml
        },
        {
            language: 'typescript',
            code: avatarGroupIndividualTs,
            fileName: 'avatar-group-individual-type-example',
            component: 'AvatarGroupIndividualTypeExampleComponent'
        },
        {
            language: 'typescript',
            name: 'avatar-group-data-example.service.ts',
            code: avatarGroupDataServiceTs,
            fileName: 'avatar-group-data-example',
            component: 'AvatarGroupDataExampleService',
            service: true
        }
    ];

    groupType: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'avatar-group-group-type-example',
            code: avatarGroupGroupHtml
        },
        {
            language: 'typescript',
            code: avatarGroupGroupTs,
            fileName: 'avatar-group-group-type-example',
            component: 'AvatarGroupGroupTypeExampleComponent'
        },
        {
            language: 'typescript',
            name: 'avatar-group-data-example.service.ts',
            code: avatarGroupDataServiceTs,
            fileName: 'avatar-group-data-example',
            component: 'AvatarGroupDataExampleService',
            service: true
        }
    ];
}
