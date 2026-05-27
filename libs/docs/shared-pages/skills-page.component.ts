import { Component } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

@Component({
    template: `
        <markdown
            class="fd-docs-playground--markdown"
            src="assets/skills/README.md"
            (load)="onLoad()"
            (error)="onError()"
        ></markdown>
    `,
    imports: [MarkdownModule]
})
export class SkillsPageComponent {
    onLoad(): void {}
    onError(): void {}
}
