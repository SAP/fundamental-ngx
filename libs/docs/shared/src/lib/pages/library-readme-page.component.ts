import { Component, inject } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { CURRENT_LIB } from '../utilities/libraries';

@Component({
    template: `
        <markdown class="fd-playground--markdown" [src]="readmeSrc" (load)="onLoad()" (error)="onError()"> </markdown>
    `,
    standalone: true,
    imports: [MarkdownModule]
})
export class LibraryReadmePageComponent {
    readmeSrc = `assets/${inject(CURRENT_LIB)}/README.md`;
    onLoad(): void {}
    onError(): void {}
}
