import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { GridListModule } from '@fundamental-ngx/core/grid-list';
import { LinkComponent } from '@fundamental-ngx/core/link';

interface GridListItem {
    title: string;
    description: string;
}

@Component({
    selector: 'fd-grid-list-more-example',
    templateUrl: './grid-list-more-example.component.html',
    styleUrls: ['./grid-list-more-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [GridListModule, AvatarComponent, LinkComponent, RouterLink]
})
export class GridListMoreExampleComponent {
    totalItems = 50;

    list: GridListItem[] = Array(5).fill({
        title: 'Title',
        description: 'Description'
    });

    showMore(): void {
        if (this.list.length === this.totalItems) {
            return;
        }

        const newPart: GridListItem[] = Array(5).fill({
            title: 'Title',
            description: 'Description'
        });

        this.list.push(...newPart);
    }
}
