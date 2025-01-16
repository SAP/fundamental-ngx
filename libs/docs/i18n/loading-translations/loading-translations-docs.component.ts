import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LinkComponent } from '@fundamental-ngx/core/link';
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
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        CodeSnippetComponent,
        SeparatorComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        LinkComponent
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

    propertiesUsageExample = {
        language: 'typescript',
        code: `
import { NgModule, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, map } from 'rxjs';
import { FD_LANGUAGE, FdLanguage, loadProperties } from '@fundamental-ngx/i18n';

/**
 * uk.properties content
...other properties
coreMultiComboBox.selectAllLabel = Select all label custom
*/

@NgModule({
    // ...
    providers: [
        {
            provide: FD_LANGUAGE,
            useFactory: () => {
                return inject(HttpClient) // Or any other way to get the file content
                    .get('./assets/i18n/uk.properties', { responseType: 'text' })
                    .pipe(map(loadProperties))
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
