import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { MessageStripComponent } from '@fundamental-ngx/core/message-strip';
import {
    CodeExampleComponent,
    CodeSnippetComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { GettingStartedExampleComponent } from './examples/getting-started-example.component';

@Component({
    selector: 'fd-docs-i18n-getting-started',
    templateUrl: './getting-started-docs.component.html',
    imports: [
        DescriptionComponent,
        DocsSectionTitleComponent,
        CodeSnippetComponent,
        MessageStripComponent,
        SeparatorComponent,
        LinkComponent,
        RouterLink,
        ComponentExampleComponent,
        CodeExampleComponent,
        GettingStartedExampleComponent
    ]
})
export class GettingStartedDocsComponent {
    installExample: ExampleFile = {
        language: 'bash',
        code: `npm install @fundamental-ngx/core @fundamental-ngx/i18n`,
        fileName: 'install'
    };

    provideLanguageExample: ExampleFile = {
        language: 'typescript',
        code: `import { ApplicationConfig } from '@angular/core';
import { provideFundamentalTranslations } from '@fundamental-ngx/i18n';
import { FD_LANGUAGE_GERMAN } from '@fundamental-ngx/i18n/de';
import { FD_LANGUAGE_FRENCH } from '@fundamental-ngx/i18n/fr';

export const appConfig: ApplicationConfig = {
  providers: [
    // Optional — language auto-detects from browser by default.
    // List the languages your app supports:
    provideFundamentalTranslations(FD_LANGUAGE_GERMAN, FD_LANGUAGE_FRENCH)
  ]
};`,
        fileName: 'app.config'
    };

    importPipeExample: ExampleFile = {
        language: 'typescript',
        code: `import { Component } from '@angular/core';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';

@Component({
  selector: 'my-component',
  templateUrl: './my-component.html',
  imports: [FdTranslatePipe] // Add the pipe to imports
})
export class MyComponent {}`,
        fileName: 'my-component'
    };

    usePipeExample: ExampleFile = {
        language: 'html',
        code: `<!-- Simple text translation -->
<h1>{{ ('coreDatePicker.dateInputLabel' | fdTranslate)() }}</h1>

<!-- In a button -->
<button>{{ ('corePagination.ariaLabel' | fdTranslate)() }}</button>

<!-- In an attribute (like aria-label or title) -->
<button [title]="('coreDatePicker.displayCalendarToggleLabel' | fdTranslate)()">
  📅
</button>`,
        fileName: 'template-example'
    };

    useInCodeExample: ExampleFile = {
        language: 'typescript',
        code: `import { Component } from '@angular/core';
import { resolveTranslationSignal } from '@fundamental-ngx/i18n';

@Component({
  selector: 'my-component',
  template: \`
    <div>{{ dateLabel() }}</div>
    <button (click)="showMessage()">Show Alert</button>
  \`
})
export class MyComponent {
  // Create a translation signal
  dateLabel = resolveTranslationSignal('coreDatePicker.dateInputLabel');

  showMessage() {
    // Use the translation in your code
    alert(this.dateLabel()); // Shows: "Enter date" in English
  }
}`,
        fileName: 'use-in-code'
    };

    switchLanguageExample: ExampleFile = {
        language: 'typescript',
        code: `import { Component, inject } from '@angular/core';
import { FD_LANGUAGE_SIGNAL } from '@fundamental-ngx/i18n';
import { FD_LANGUAGE_ENGLISH } from '@fundamental-ngx/i18n/en';
import { FD_LANGUAGE_SPANISH } from '@fundamental-ngx/i18n/es';

@Component({
  selector: 'my-component',
  template: \`
    <button (click)="switchToEnglish()">English</button>
    <button (click)="switchToSpanish()">Español</button>
  \`
})
export class MyComponent {
  private langSignal = inject(FD_LANGUAGE_SIGNAL);

  switchToEnglish() {
    this.langSignal.set(FD_LANGUAGE_ENGLISH);
  }

  switchToSpanish() {
    this.langSignal.set(FD_LANGUAGE_SPANISH);
  }
}`,
        fileName: 'switch-language'
    };

    gettingStartedExampleFiles: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'GettingStartedExampleComponent',
            code: getAssetFromModuleAssets('getting-started-example.component.ts'),
            fileName: 'getting-started-example'
        }
    ];
}
