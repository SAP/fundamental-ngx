import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fd-grid-list-more-example',
    templateUrl: './grid-list-more-example.component.html',
    styleUrls: ['../grid-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridListMoreExampleComponent {
    totalItems = 50;
    list = Array(5).fill({
        title: 'Title',
        description: 'Description'
    });

    showMore(): void {
        if (this.list.length === this.totalItems) {
            return;
        }

        const newPart = Array(5).fill({
            title: 'Title',
            description: 'Description'
        });

        this.list.push(...newPart);
    }
}
