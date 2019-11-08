import { OnInit, Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as platformBasicMenuSrc from '!raw-loader!./platform-menu-examples/platform-menu-basic-example.component.html';
import * as platformMenuSeparatorSrc from '!raw-loader!./platform-menu-examples/platform-menu-separator-example.component.html';
import * as platformMenuAddonSrc from '!raw-loader!./platform-menu-examples/platform-menu-icons-example.component.html';
import * as platformMenuGroupSrc from '!raw-loader!./platform-menu-examples/platform-menu-group-example.component.html';
import * as platformComplexMenuSrc from '!raw-loader!./platform-menu-examples/platform-menu-complex-example.component.html';
import * as platformMenuTsCode from '!raw-loader!./platform-menu-examples/platform-menu-examples.component.ts';
import { DocsSectionTitleComponent } from '../../../documentation/core-helpers/docs-section-title/docs-section-title.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './platform-menu-docs.component.html'
})
export class PlatformMenuDocsComponent implements OnInit {
    menuBasic: ExampleFile[] = [
        {
            language: 'html',
            code: platformBasicMenuSrc,
            fileName: 'platform-menu-basic-example',
            secondFile: 'platform-menu-examples',
            typescriptFileCode: platformMenuTsCode,
            component: 'PlatformBasicMenuExampleComponent'
        }
    ];

    menuSeparator: ExampleFile[] = [
        {
            language: 'html',
            code: platformMenuSeparatorSrc,
            fileName: 'platform-menu-separator-example',
            secondFile: 'platform-menu-examples',
            typescriptFileCode: platformMenuTsCode,
            component: 'PlatformMenuSeparatorExampleComponent'
        }
    ];

    menuAddon: ExampleFile[] = [
        {
            language: 'html',
            code: platformMenuAddonSrc,
            fileName: 'platform-menu-icons-example',
            secondFile: 'platform-menu-examples',
            typescriptFileCode: platformMenuTsCode,
            component: 'PlatformMenuIconsExampleComponent'
        }
    ];

    menuGroup: ExampleFile[] = [
        {
            language: 'html',
            code: platformMenuGroupSrc,
            fileName: 'platform-menu-group-example',
            secondFile: 'platform-menu-examples',
            typescriptFileCode: platformMenuTsCode,
            component: 'PlatformMenuGroupExampleComponent'
        }
    ];

    menuComplex: ExampleFile[] = [
        {
            language: 'html',
            code: platformComplexMenuSrc,
            fileName: 'platform-menu-complex-example',
            secondFile: 'platform-menu-examples',
            typescriptFileCode: platformMenuTsCode,
            component: 'PlatformComplexMenuExampleComponent'
        }
    ];

    ngOnInit() {}
}
