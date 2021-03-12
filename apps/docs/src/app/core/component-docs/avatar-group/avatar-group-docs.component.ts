import { Component } from '@angular/core';

import * as avatarGroupIndividualTs from '!raw-loader!./examples/avatar-group-individual-type-example.component.ts';
import * as avatarGroupIndividualHtml from '!raw-loader!./examples/avatar-group-individual-type-example.component.html';
import * as avatarGroupIndividualScss from '!raw-loader!./examples/avatar-group-individual-type-example.component.scss';
import * as avatarGroupGroupTs from '!raw-loader!./examples/avatar-group-group-type-example.component.ts';
import * as avatarGroupGroupHtml from '!raw-loader!./examples/avatar-group-group-type-example.component.html';
import * as avatarGroupGroupScss from '!raw-loader!./examples/avatar-group-group-type-example.component.scss';
import * as avatarGroupDataServiceTs from '!raw-loader!./examples/avatar-group-data-example.service.ts';

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
            language: 'scss',
            fileName: 'avatar-group-individual-type-example',
            code: avatarGroupIndividualScss
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
            language: 'scss',
            fileName: 'avatar-group-group-type-example',
            code: avatarGroupGroupScss
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
