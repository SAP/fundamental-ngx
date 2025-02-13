import { Component } from '@angular/core';
import { FdPatchLanguageDirective } from '@fundamental-ngx/i18n';
import { PlatformFeedInputModule } from '@fundamental-ngx/platform/feed-input';

@Component({
    selector: 'fdp-platform-feed-input-example',
    templateUrl: './platform-feed-input-example.component.html',
    imports: [PlatformFeedInputModule, FdPatchLanguageDirective]
})
export class PlatformFeedInputExampleComponent {
    feedValue: string;

    onSubmit(value: string): void {
        this.feedValue = value;
    }
}
