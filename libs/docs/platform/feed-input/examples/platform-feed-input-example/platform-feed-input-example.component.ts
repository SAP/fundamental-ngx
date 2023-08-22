import { Component } from '@angular/core';
import { FdPatchLanguageDirective } from '../../../../../i18n/src/lib/directives/patch-language.directive';
import { PlatformFeedInputModule } from '@fundamental-ngx/platform/feed-input';

@Component({
    selector: 'fdp-platform-feed-input-example',
    templateUrl: './platform-feed-input-example.component.html',
    standalone: true,
    imports: [PlatformFeedInputModule, FdPatchLanguageDirective]
})
export class PlatformFeedInputExampleComponent {
    feedValue: string;

    onSubmit(value: string): void {
        this.feedValue = value;
    }
}
