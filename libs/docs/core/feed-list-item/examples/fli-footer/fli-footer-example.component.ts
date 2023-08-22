import { Component } from '@angular/core';
import { ToolbarSeparatorComponent } from '@fundamental-ngx/core/toolbar';
import { ToolbarLabelDirective } from '@fundamental-ngx/core/toolbar';
import { ToolbarComponent } from '@fundamental-ngx/core/toolbar';
import { FeedListItemModule } from '@fundamental-ngx/core/feed-list-item';

@Component({
    selector: 'fd-fli-footer-example',
    templateUrl: './fli-footer-example.component.html',
    standalone: true,
    imports: [FeedListItemModule, ToolbarComponent, ToolbarLabelDirective, ToolbarSeparatorComponent]
})
export class FliFooterExampleComponent {}
