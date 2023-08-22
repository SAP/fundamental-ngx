import { Component } from '@angular/core';
import { FdPatchLanguageDirective } from '../../../../../i18n/src/lib/directives/patch-language.directive';
import { FeedListItemModule } from '@fundamental-ngx/core/feed-list-item';

@Component({
    selector: 'fd-fli-simple-example',
    templateUrl: './fli-simple-example.component.html',
    standalone: true,
    imports: [FeedListItemModule, FdPatchLanguageDirective]
})
export class FliSimpleExampleComponent {
    hasFormattedText = true;
}
