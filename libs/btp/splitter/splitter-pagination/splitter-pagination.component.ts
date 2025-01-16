import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { SplitterComponent } from '../splitter.component';

@Component({
    selector: 'fdb-splitter-pagination',
    templateUrl: './splitter-pagination.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fd-splitter__pagination',
        '[attr.role]': '"radiogroup"'
    },
    imports: [ButtonComponent, FdTranslatePipe]
})
export class SplitterPaginationComponent {
    /** Array of pages ids. */
    @Input()
    pages: string[] = [];

    /** Current page id. */
    @Input()
    currentPage: string;

    /** Event emitted on page change. */
    @Output()
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    onPageChange = new EventEmitter<string>();

    /** @Hidden */
    constructor(private readonly _splitter: SplitterComponent) {}

    /** @hidden */
    _changePage(page: string): void {
        if (page === this.currentPage) {
            return;
        }

        this.currentPage = page;
        this.onPageChange.emit(this.currentPage);
    }
}
