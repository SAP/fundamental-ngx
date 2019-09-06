import { Component, HostBinding } from '@angular/core';

/**
 * Applies fundamental layout and styling to the contents of a modal body.
 *
 * ```html
 * <fd-modal-body>
 *     <div>Modal body content</div>
 * </fd-modal-body>
 * ```
 */
@Component({
    selector: 'fd-modal-body',
    templateUrl: './modal-body.component.html',
    styles: [`
        :host {
            display: block;
            overflow: auto;
            flex-grow: 1;
        }
    `]
})
export class ModalBodyComponent {

    /** @hidden */
    @HostBinding('class.fd-modal__body')
    modalBody = true;
}
