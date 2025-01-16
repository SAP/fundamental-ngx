import { Component } from '@angular/core';
import { ActionSheetModule } from '@fundamental-ngx/core/action-sheet';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { FeedListItemModule } from '@fundamental-ngx/core/feed-list-item';

@Component({
    selector: 'fd-fli-action-example',
    templateUrl: './fli-action-example.component.html',
    imports: [FeedListItemModule, ButtonComponent, ContentDensityDirective, ActionSheetModule]
})
export class FliActionExampleComponent {
    onClick(): void {
        alert('You custom action');
    }
}
