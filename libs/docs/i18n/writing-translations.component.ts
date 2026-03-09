import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { MessageStripComponent } from '@fundamental-ngx/core/message-strip';
import {
    CodeSnippetComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    HeaderComponent,
    SeparatorComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    templateUrl: './writing-translations.component.html',
    imports: [
        HeaderComponent,
        DescriptionComponent,
        RouterLink,
        LinkComponent,
        CodeSnippetComponent,
        DocsSectionTitleComponent,
        SeparatorComponent,
        MessageStripComponent
    ]
})
export class WritingTranslationsComponent {
    fromToCode = "'{'{from}'}'-'{'{to}'}'";
    fromToCodeTranslation = '{0-12}';

    jsonExample: ExampleFile = {
        language: 'json',
        code: `{
  "platformTable.headerMenuFreezePlural": "{count, plural, =1 {Freeze 1 column} other {Freeze # columns}}",
  "platformTable.headerMenuUnfreezePlural": "{count, plural, =1 {Unfreeze 1 column} other {Unfreeze # columns}}",
  "platformTable.headerMenuSortAsc": "Sort Ascending",
  "platformTable.messageFilterSuccess": "Filter applied to {columnName}.",
  "platformTable.messageNoDataWithFilter": "No {@@platformTable.headerMenuFreezePlural} or {@@platformTable.headerMenuUnfreezePlural} available."
}`,
        fileName: 'translations'
    };

    jsExample: ExampleFile = {
        language: 'typescript',
        code: `const headerMenuFreezePlural = ({count}) => {
    return count === 1 ? 'Freeze 1 column' : \`Freeze \${count} columns\`;
};

const headerMenuUnfreezePlural = ({count}) => {
    return count === 1 ? 'Unfreeze 1 column' : \`Unfreeze \${count} columns\`;
};

const platformTable = {
    headerMenuFreezePlural,
    headerMenuUnfreezePlural,
    headerMenuSortAsc: 'Sort Ascending',
    messageFilterSuccess: ({columnName}) => \`Filter applied to \${columnName}.\`,
    messageNoDataWithFilter: ({freezeCount, unfreezeCount}) => {
        const freeze = headerMenuFreezePlural({count: freezeCount});
        const unfreeze = headerMenuUnfreezePlural({count: unfreezeCount});
        return \`No \${freeze} or \${unfreeze} available.\`;
    }
};`,
        fileName: 'translations'
    };

    internalReferenceExample: ExampleFile = {
        language: 'json',
        code: `{
  // Define reusable translations
  "platformTable.headerMenuFreezePlural": "{count, plural, =1 {Freeze 1 column} other {Freeze # columns}}",
  "platformTable.headerMenuUnfreezePlural": "{count, plural, =1 {Unfreeze 1 column} other {Unfreeze # columns}}",

  // Reference them using @@keyName syntax
  "platformTable.messageNoDataWithFilter": "No {@@platformTable.headerMenuFreezePlural} or {@@platformTable.headerMenuUnfreezePlural} available."
}`,
        fileName: 'internal-references-example'
    };

    escapingExample: ExampleFile = {
        language: 'json',
        code: `{
  // To display literal {0-12}, escape the curly braces:
  "myTranslationKey": "'{'{from}'}'-'{'{to}'}'"

  // This will render as: {0-12} when from=0 and to=12
}`,
        fileName: 'escaping-example'
    };
}
