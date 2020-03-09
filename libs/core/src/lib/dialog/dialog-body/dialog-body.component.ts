import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

/**
 * Applies fundamental layout and styling to the contents of a dialog body.
 *
 * ```html
 * <fd-dialog-body>
 *     <div>Modal body content</div>
 * </fd-dialog-body>
 * ```
 */
@Component({
    selector: 'fd-dialog-body',
    templateUrl: './dialog-body.component.html',
    styles: [`
        :host {
            display: block;
            overflow: auto;
            flex-grow: 1;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogBodyComponent {

    /** @hidden */
    @HostBinding('class.fd-modal__body')
    modalBody = true;
}
