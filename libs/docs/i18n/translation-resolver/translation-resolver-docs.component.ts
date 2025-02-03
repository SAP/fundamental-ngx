import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LinkComponent } from '@fundamental-ngx/core/link';
import {
    CodeExampleComponent,
    CodeSnippetComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getExampleFile
} from '@fundamental-ngx/docs/shared';
import { BasicUsageExampleComponent } from './examples/basic-usage-example.component';
import { UsingTranslationPipeExampleComponent } from './examples/using-translation-pipe-example.component';
import { UsingUtilityFunctionsExampleComponent } from './examples/using-utility-functions-example.component';

@Component({
    templateUrl: './translation-resolver-docs.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        CodeSnippetComponent,
        SeparatorComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        BasicUsageExampleComponent,
        UsingUtilityFunctionsExampleComponent,
        LinkComponent,
        UsingTranslationPipeExampleComponent
    ]
})
export class TranslationResolverDocsComponent {
    basicTranslationResolverExampleFiles: ExampleFile[] = [getExampleFile('basic-usage-example.component.ts')];

    utilityTranslationResolverExampleFiles: ExampleFile[] = [
        getExampleFile('using-utility-functions-example.component.ts')
    ];

    usingTranslationPipeExampleFiles: ExampleFile[] = [getExampleFile('using-translation-pipe-example.component.ts')];
}
