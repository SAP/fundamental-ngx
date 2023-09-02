import { Component } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

@Component({
    templateUrl: './core-home.component.html',
    imports: [MarkdownModule],
    standalone: true
})
export class HomeDocsComponent {
    onLoad(): void {}
    onError(): void {}
}
