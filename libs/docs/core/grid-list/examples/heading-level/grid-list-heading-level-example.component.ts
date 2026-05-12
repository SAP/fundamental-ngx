import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { GridListModule } from '@fundamental-ngx/core/grid-list';

@Component({
    selector: 'fd-grid-list-heading-level-example',
    templateUrl: './grid-list-heading-level-example.component.html',
    styleUrls: ['./grid-list-heading-level-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [GridListModule, AvatarComponent]
})
export class GridListHeadingLevelExampleComponent {
    list = Array(5).fill({
        title: 'Title',
        description: 'Description'
    });
}
