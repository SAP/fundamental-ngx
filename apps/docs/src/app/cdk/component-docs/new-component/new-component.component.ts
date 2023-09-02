import { Component } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

@Component({
    selector: 'app-cdk-new-component',
    templateUrl: './new-component.component.html',
    standalone: true,
    imports: [MarkdownModule]
})
export class NewComponentComponent {
    onLoad(): void {}
    onError(): void {}
}
