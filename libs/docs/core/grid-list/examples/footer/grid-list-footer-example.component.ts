import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { NgFor } from '@angular/common';
import { GridListModule } from '@fundamental-ngx/core/grid-list';

interface GridListItem {
    title: string;
    description: string;
}

@Component({
    selector: 'fd-grid-list-footer-example',
    templateUrl: './grid-list-footer-example.component.html',
    styleUrls: ['./grid-list-footer-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [GridListModule, NgFor, AvatarModule, LinkComponent, RouterLink]
})
export class GridListFooterExampleComponent {
    list: GridListItem[] = Array(5).fill({
        title: 'Title',
        description: 'Description'
    });
}
