import { Component } from '@angular/core';

import fliSimpleH from '!./examples/fli-simple/fli-simple-example.component.html?raw';
import fliSimpleT from '!./examples/fli-simple/fli-simple-example.component.ts?raw';

import fliAvatarH from '!./examples/fli-avatar/fli-avatar-example.component.html?raw';
import fliAvatarT from '!./examples/fli-avatar/fli-avatar-example.component.ts?raw';

import fliActionH from '!./examples/fli-action/fli-action-example.component.html?raw';
import fliActionT from '!./examples/fli-action/fli-action-example.component.ts?raw';

import fliFooterH from '!./examples/fli-footer/fli-footer-example.component.html?raw';
import fliFooterT from '!./examples/fli-footer/fli-footer-example.component.ts?raw';

import fliMobileH from '!./examples/fli-mobile/fli-mobile-example.component.html?raw';
import fliMobileT from '!./examples/fli-mobile/fli-mobile-example.component.ts?raw';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-feed-list-item-doc',
    templateUrl: './feed-list-item-docs.component.html'
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

    fliMobileExample: ExampleFile[] = [
        {
            language: 'html',
            code: fliMobileH,
            fileName: 'fli-mobile-example'
        },
        {
            language: 'typescript',
            component: 'FliMobileExampleComponent',
            code: fliMobileT,
            fileName: 'fli-mobile-example'
        }
    ];
}
