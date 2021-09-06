import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-splitter-pagination',
    templateUrl: './splitter-pagination.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: 'fd-splitter__pagination' }
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
    onPageChange = new EventEmitter<string>();

    /** @hidden */
    _pages: string[] = [];

    /** @hidden */
    _changePage(page: string): void {
        if (page === this.currentPage) {
            return;
        }

        this.currentPage = page;
        this.onPageChange.emit(this.currentPage);
    }
}
