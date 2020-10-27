import { Component } from '@angular/core';

import * as fliSimpleH from '!raw-loader!./examples/fli-simple/fli-simple-example.component.html';
import * as fliSimpleT from '!raw-loader!./examples/fli-simple/fli-simple-example.component.ts';

import * as fliAvatarH from '!raw-loader!./examples/fli-avatar/fli-avatar-example.component.html';
import * as fliAvatarT from '!raw-loader!./examples/fli-avatar/fli-avatar-example.component.ts';

import * as fliActionH from '!raw-loader!./examples/fli-action/fli-action-example.component.html';
import * as fliActionT from '!raw-loader!./examples/fli-action/fli-action-example.component.ts';

import * as fliFooterH from '!raw-loader!./examples/fli-footer/fli-footer-example.component.html';
import * as fliFooterT from '!raw-loader!./examples/fli-footer/fli-footer-example.component.ts';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-feed-list-item-doc',
    templateUrl: './feed-list-item-docs.component.html',
    styleUrls: ['./feed-list-item-docs.component.scss']
})
export class FeedListItemDocsComponent {
    fliSimpleExample: ExampleFile[] = [
        {
            language: 'html',
            code: fliSimpleH,
            fileName: 'fli-simple-example'
        },
        {
            language: 'typescript',
            component: 'FliSimpleExampleComponent',
            code: fliSimpleT,
            fileName: 'fli-simple-example'
        }
    ];

    fliAvatarExample: ExampleFile[] = [
        {
            language: 'html',
            code: fliAvatarH,
            fileName: 'fli-avatar-example'
        },
        {
            language: 'typescript',
            component: 'FliAvatarExampleComponent',
            code: fliAvatarT,
            fileName: 'fli-avatar-example'
        }
    ];

    fliActionExample: ExampleFile[] = [
        {
            language: 'html',
            code: fliActionH,
            fileName: 'fli-action-example'
        },
        {
            language: 'typescript',
            component: 'FliActionExampleComponent',
            code: fliActionT,
            fileName: 'fli-action-example'
        }
    ];

    fliFooterExample: ExampleFile[] = [
        {
            language: 'html',
            code: fliFooterH,
            fileName: 'fli-footer-example'
        },
        {
            language: 'typescript',
            component: 'FliFooterExampleComponent',
            code: fliFooterT,
            fileName: 'fli-footer-example'
        }
    ];
}
