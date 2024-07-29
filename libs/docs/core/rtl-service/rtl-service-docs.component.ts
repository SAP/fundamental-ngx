import { Component } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { RtlServiceBasicExampleComponent } from './exmaples/rtl-service-basic-example.component';

const rtlServiceBasicExample = 'rtl-service-basic-example.component.ts';

@Component({
    selector: 'fd-rtl-service-docs',
    templateUrl: './rtl-service-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        RtlServiceBasicExampleComponent,
        CodeExampleComponent
    ],
    standalone: true
})
export class RtlServiceDocsComponent {
    rtlService: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(rtlServiceBasicExample),
            fileName: 'rtl-service-basic-example',
            component: 'RtlServiceBasicExampleComponent'
        }
    ];
}
