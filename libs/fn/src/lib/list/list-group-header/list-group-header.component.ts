import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

type ListGroupHeaderTextPosition = 'start' | 'end';

@Component({
    selector: 'fn-list-group-header, [fn-list-group-header]',
    templateUrl: './list-group-header.component.html',
    styleUrls: ['./list-group-header.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
    host: {
        '[class]': `'fn-list__group-header ' + (class || '')`
    }
})
export class ListGroupHeaderComponent {
    @Input()
    class!: string;

    @Input()
    position: ListGroupHeaderTextPosition = 'start';

    constructor() {}
}
