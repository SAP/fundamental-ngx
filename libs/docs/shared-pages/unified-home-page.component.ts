import { Component } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

/**
 * Unified home page component that displays the consolidated documentation README.
 * This replaces individual package home pages with a single unified getting started guide.
 */
@Component({
    selector: 'fd-unified-home-page',
    template: `<markdown class="fd-playground--markdown" [src]="readmeSrc"></markdown>`,
    imports: [MarkdownModule]
})
export class UnifiedHomePageComponent {
    readmeSrc = 'assets/docs/GETTING_STARTED.md';
}
