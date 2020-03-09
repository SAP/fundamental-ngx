import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

/**
 * Applies fundamental layout and styling to the contents of a dialog footer.
 *
 * ```html
 * <fd-dialog-footer>
 *     <button>Do action</button>
 * </fd-dialog-footer>
 * ```
 */
@Component({
    selector: 'fd-dialog-footer',
    templateUrl: './dialog-footer.component.html',
    styles: [`
        :host {
            display: block;
            border-top: 1px solid #eeeeef;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogFooterComponent {

    /** @hidden */
    @HostBinding('class.fd-modal__footer')
    modalFooter = true;
}
