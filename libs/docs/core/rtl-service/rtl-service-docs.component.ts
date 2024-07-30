import { Component } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { RtlServiceBasicExampleComponent } from './examples/rtl-service-basic-example/rtl-service-basic-example.component';

const rtlServiceBasicExampleTs = 'rtl-service-basic-example/rtl-service-basic-example.component.ts';
const rtlServiceBasicExampleHtml = 'rtl-service-basic-example/rtl-service-basic-example.component.html';

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
            language: 'html',
            code: getAssetFromModuleAssets(rtlServiceBasicExampleHtml),
            fileName: 'rtl-service-basic-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(rtlServiceBasicExampleTs),
            fileName: 'rtl-service-basic-example',
            component: 'RtlServiceBasicExampleComponent'
        }
    ];
}
