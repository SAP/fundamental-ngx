import { Component } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

@Component({
    template: `
        <markdown
            class="fd-playground--markdown"
            src="assets/NEW_COMPONENT.md"
            (load)="onLoad()"
            (error)="onError()"
        ></markdown>
    `,
    imports: [MarkdownModule]
})
export class NewComponentPageComponent {
    onLoad(): void {}
    onError(): void {}
}
