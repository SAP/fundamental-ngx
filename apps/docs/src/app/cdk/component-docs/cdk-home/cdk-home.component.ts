import { Component } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

@Component({
    selector: 'app-cdk-home',
    templateUrl: './cdk-home.component.html',
    standalone: true,
    imports: [MarkdownModule]
})
export class HomeDocsComponent {
    onLoad(): void {}
    onError(): void {}
}
