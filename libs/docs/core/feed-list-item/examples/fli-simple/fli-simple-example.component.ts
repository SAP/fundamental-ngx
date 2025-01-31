import { Component } from '@angular/core';
import { FeedListItemModule } from '@fundamental-ngx/core/feed-list-item';
import { FdPatchLanguageDirective } from '@fundamental-ngx/i18n';

@Component({
    selector: 'fd-fli-simple-example',
    templateUrl: './fli-simple-example.component.html',
    imports: [FeedListItemModule, FdPatchLanguageDirective]
})
export class FliSimpleExampleComponent {
    hasFormattedText = true;
}
