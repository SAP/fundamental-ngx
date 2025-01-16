import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { GridListModule } from '@fundamental-ngx/core/grid-list';

@Component({
    selector: 'fd-grid-list-auto-height-example',
    templateUrl: './grid-list-auto-height-example.component.html',
    styleUrls: ['./grid-list-auto-height-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [GridListModule, ButtonComponent, ContentDensityDirective, AvatarComponent]
})
export class GridListAutoHeightExampleComponent {
    showAlert(message: string): void {
        alert('Clicked on ' + message);
    }
}
