import { Component } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

@Component({
    template: `
        <markdown
            class="fd-docs-playground--markdown"
            src="assets/mcp-server/README.md"
            (load)="onLoad()"
            (error)="onError()"
        ></markdown>
    `,
    imports: [MarkdownModule]
})
export class McpServerPageComponent {
    onLoad(): void {}
    onError(): void {}
}
