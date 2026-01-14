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

import { BidiServiceBasicExampleComponent } from './examples/bidi-service-basic-example/bidi-service-basic-example.component';

const bidiServiceBasicExampleTs = 'bidi-service-basic-example/bidi-service-basic-example.component.ts';
const bidiServiceBasicExampleHtml = 'bidi-service-basic-example/bidi-service-basic-example.component.html';
const bidiServiceBasicExampleScss = 'bidi-service-basic-example/bidi-service-basic-example.component.scss';

@Component({
    selector: 'fd-bidi-docs',
    templateUrl: './bidi-docs.component.html',
    imports: [
        CodeExampleComponent,
        ComponentExampleComponent,
        DescriptionComponent,
        DocsSectionTitleComponent,
        SeparatorComponent,
        BidiServiceBasicExampleComponent
    ]
})
export class BidiDocsComponent {
    basicUsageCode = `import { inject } from '@angular/core';
import { BidiService } from '@fundamental-ngx/cdk/utils';

export class MyComponent {
    private bidiService = inject(BidiService);
    
    protected readonly isRtl = this.bidiService.rtl;
    protected readonly direction = this.bidiService.dir;
}`;

    customLanguagesCode = `providers: [
    BidiService,
    { provide: RTL_LANGUAGE, useValue: ['ar', 'he', 'fa'] }
]`;

    rtlLanguages = `['ar', 'arc', 'ckb', 'dv', 'fa', 'ha', 'he', 'khw', 'ks', 'ku', 'pnb', 'ps', 'sd', 'ug', 'ur', 'yi']`;

    bidiServiceBasicExample: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(bidiServiceBasicExampleTs),
            fileName: 'bidi-service-basic-example',
            component: 'BidiServiceBasicExampleComponent'
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(bidiServiceBasicExampleHtml),
            fileName: 'bidi-service-basic-example'
        },
        {
            language: 'scss',
            code: getAssetFromModuleAssets(bidiServiceBasicExampleScss),
            fileName: 'bidi-service-basic-example'
        }
    ];
}
