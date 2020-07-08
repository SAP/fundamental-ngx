import { Component } from '@angular/core';
import * as avatarExampleHtml from '!raw-loader!./examples/avatar-example.component.html';
import * as avatarExampleScs from '!raw-loader!./examples/avatar-example.component.scss';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-avatar',
    templateUrl: './avatar-docs.component.html'
})
export class AvatarDocsComponent {

    avatarBasicExample: ExampleFile[] = [
        {
            language: 'html',
            scssFileCode: avatarExampleScs,
            fileName: 'avatar-example',
            code: avatarExampleHtml
        }
    ];
}
