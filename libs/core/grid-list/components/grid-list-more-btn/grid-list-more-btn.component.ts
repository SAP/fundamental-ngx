import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { KeyUtil } from '@fundamental-ngx/cdk/utils';

@Component({
    selector: 'fd-grid-list-more-btn',
    templateUrl: './grid-list-more-btn.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fd-col fd-col--12'
    },
    standalone: true
})
export class GridListMoreBtnComponent {
    /** Sets title of the button */
    @Input()
    title: string;

    /** Sets the number of total items. */
    @Input()
    totalCount: number;

    /** Sets the number of display items. */
    @Input()
    displayCount: number;

    /** Event is thrown, when the control button is clicked */
    @Output()
    showMore = new EventEmitter<void>();

    /** @ignore */
    _onKeyDown(event: KeyboardEvent): void {
        if (!KeyUtil.isKeyCode(event, [ENTER, SPACE])) {
            return;
        }

        event.preventDefault();

        this.showMore.emit();
    }
}
