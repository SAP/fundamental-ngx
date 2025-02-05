import { Component, inject } from '@angular/core';
import { CURRENT_LIB } from '@fundamental-ngx/docs/shared';
import { MarkdownModule } from 'ngx-markdown';

@Component({
    template: `
        <markdown class="fd-playground--markdown" [src]="readmeSrc" (load)="onLoad()" (error)="onError()"> </markdown>
    `,
    imports: [MarkdownModule]
})
export class LibraryReadmePageComponent {
    readmeSrc = `assets/${inject(CURRENT_LIB)}/README.md`;
    onLoad(): void {}
    onError(): void {}
}
