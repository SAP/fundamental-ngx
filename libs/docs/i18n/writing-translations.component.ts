/* eslint-disable max-len */
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LinkComponent } from '@fundamental-ngx/core/link';
import {
    CodeExampleComponent,
    CodeSnippetComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    HeaderComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    templateUrl: './writing-translations.component.html',
    imports: [
        HeaderComponent,
        DescriptionComponent,
        RouterLink,
        LinkComponent,
        CodeExampleComponent,
        CodeSnippetComponent,
        DocsSectionTitleComponent
    ]
})
export class WritingTranslationsComponent {
    fromToCode = "'{'{from}'}'-'{'{to}'}'";
    fromToCodeTranslation = '{0-12}';
    jsonExample: ExampleFile = {
        language: 'json',
        code: `{
  "platformUploadCollection.folderNamePluralization": "{folderCount, plural, =1 {1 folder} other {# folders}}",
  "platformUploadCollection.fileNamePluralization": "{filesCount, plural, =1 {1 file} other {# files}}",
  "platformUploadCollection.removeBtnLabel": "Remove",
  "platformUploadCollection.messageUpdateVersionSuccess": "{folderName} version has been updated.",
  "platformUploadCollection.messageRemoveFoldersAndFilesFailed": "Failed to remove {@@platformUploadCollection.folderNamePluralization} and {@@platformUploadCollection.fileNamePluralization} files."
}`
    };
    jsExample: ExampleFile = {
        language: 'js',
        code: `const folderNamePluralization = ({folderCount}) => {
    return folderCount === 1 ? '1 folder' : \`\${folderCount} folders\`;
};

const fileNamePluralization = ({filesCount}) => {
    return filesCount === 1 ? '1 file' : \`\${filesCount} files\`;
};

const platformUploadCollection = {
    folderNamePluralization,
    fileNamePluralization,
    removeBtnLabel: 'Remove',
    messageUpdateVersionSuccess: ({folderName}) => \`\${folderName} version has been updated.\`,
    messageRemoveFoldersAndFilesFailed: ({folderName, fileName}) => {
        const folders = folderNamePluralization({folderName});
        const files = fileNamePluralization({fileName});
        return \`Failed to remove \${folders} and \${files} files.\`;
    }
};`
    };
}
