import { Component } from '@angular/core';
import {
    CodeExampleComponent,
    CodeSnippetComponent,
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
        CodeExampleComponent,
        CodeSnippetComponent
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

    injectionTokenExample = `
@NgModule({
    providers: [
        RtlService,
        { provide: RTL_LANGUAGE, useValue: ['ar', 'he', 'fa', 'your-custom-lang'] }
    ],
    ...
})
export class AppModule { }
`;
}
