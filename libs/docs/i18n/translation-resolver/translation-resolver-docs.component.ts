import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { MessageStripComponent } from '@fundamental-ngx/core/message-strip';
import { ObjectStatusComponent } from '@fundamental-ngx/core/object-status';
import { TableModule } from '@fundamental-ngx/core/table';
import {
    CodeExampleComponent,
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
        SeparatorComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        BasicUsageExampleComponent,
        UsingUtilityFunctionsExampleComponent,
        LinkComponent,
        UsingTranslationPipeExampleComponent,
        MessageStripComponent,
        TableModule,
        ObjectStatusComponent
    ]
})
export class TranslationResolverDocsComponent {
    basicTranslationResolverExampleFiles: ExampleFile[] = [getExampleFile('basic-usage-example.component.ts')];

    utilityTranslationResolverExampleFiles: ExampleFile[] = [
        getExampleFile('using-utility-functions-example.component.ts')
    ];

    usingTranslationPipeExampleFiles: ExampleFile[] = [getExampleFile('using-translation-pipe-example.component.ts')];
}
