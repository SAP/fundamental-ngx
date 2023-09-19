import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
    CodeExampleComponent,
    CodeSnippetComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    SeparatorComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    templateUrl: './loading-translations-docs.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        CodeSnippetComponent,
        SeparatorComponent,
        ComponentExampleComponent,
        CodeExampleComponent
    ]
})
export class LoadingTranslationsDocsComponent {
    basicUsageExample = {
        language: 'typescript',
        code: `import { FD_LANGUAGE, FdLanguage, FD_LANGUAGE_UKRAINIAN } from '@fundamental-ngx/i18n';

// app.module
@NgModule({
    // ...
    providers: [
        {
            provide: FD_LANGUAGE,
            useValue: of<FdLanguage>(FD_LANGUAGE_UKRAINIAN),
        },
    ],
})
export class AppModule {}`
    };

    jsonUsageExample = {
        language: 'typescript',
        code: `
import { NgModule, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, map } from 'rxjs';
import { FD_LANGUAGE, FdLanguage, loadJson } from '@fundamental-ngx/i18n';

/**
 * uk.json content
    {
        ...other properties
        "coreMultiComboBox.selectAllLabel": "Select all label custom"
    }
*/

@NgModule({
    // ...
    providers: [
        {
            provide: FD_LANGUAGE,
            useFactory: () => {
                return inject(HttpClient)
                    .get<Record<string, string>>('./assets/i18n/uk.json')
                    .pipe(map(loadJson))
            }
        },
    ],
})
export class AppModule {}
        `
    };
    supportedLanguages = [
        'Albanian',
        'Bulgarian',
        'Chinese',
        'Czech',
        'English',
        'French',
        'Georgian',
        'Hindi',
        'Italian',
        'Polish',
        'Russian',
        'Ukrainian'
    ].join(', ');
}
