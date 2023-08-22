import { Component } from '@angular/core';
import { ActionSheetModule } from '@fundamental-ngx/core/action-sheet';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { FeedListItemModule } from '@fundamental-ngx/core/feed-list-item';

@Component({
    selector: 'fd-fli-action-example',
    templateUrl: './fli-action-example.component.html',
    standalone: true,
    imports: [FeedListItemModule, ButtonModule, ContentDensityDirective, ActionSheetModule]
})
export class FliActionExampleComponent {
    onClick(): void {
        alert('You custom action');
    }
}
