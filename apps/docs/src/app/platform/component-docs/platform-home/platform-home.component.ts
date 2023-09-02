import { Component } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

@Component({
    selector: 'platform-home',
    templateUrl: './platform-home.component.html',
    standalone: true,
    imports: [MarkdownModule]
})
export class PlatformHomeComponent {
    onLoad(): void {}
    onError(): void {}
}
