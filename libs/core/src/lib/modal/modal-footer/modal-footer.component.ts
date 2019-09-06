import { Component, HostBinding } from '@angular/core';

/**
 * Applies fundamental layout and styling to the contents of a modal footer.
 *
 * ```html
 * <fd-modal-footer>
 *     <button>Do action</button>
 * </fd-modal-footer>
 * ```
 */
@Component({
    selector: 'fd-modal-footer',
    templateUrl: './modal-footer.component.html',
    styles: [`
        :host {
            display: block;
            border-top: 1px solid #eeeeef;
        }
    `]
})
export class ModalFooterComponent {

    /** @hidden */
    @HostBinding('class.fd-modal__footer')
    modalFooter = true;
}
