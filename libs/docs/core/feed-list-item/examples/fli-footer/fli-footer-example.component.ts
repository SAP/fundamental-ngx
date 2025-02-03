import { Component } from '@angular/core';
import { FeedListItemModule } from '@fundamental-ngx/core/feed-list-item';
import { ToolbarComponent, ToolbarLabelDirective, ToolbarSeparatorComponent } from '@fundamental-ngx/core/toolbar';

@Component({
    selector: 'fd-fli-footer-example',
    templateUrl: './fli-footer-example.component.html',
    imports: [FeedListItemModule, ToolbarComponent, ToolbarLabelDirective, ToolbarSeparatorComponent]
})
export class FliFooterExampleComponent {}
