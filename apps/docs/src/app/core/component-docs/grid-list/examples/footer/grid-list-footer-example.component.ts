import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fd-grid-list-footer-example',
    templateUrl: './grid-list-footer-example.component.html',
    styleUrls: ['../grid-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridListFooterExampleComponent {
    list = Array(5).fill({
        title: 'Title',
        description: 'Description'
    });
}
