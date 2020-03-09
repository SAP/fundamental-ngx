import { ChangeDetectionStrategy, Component } from '@angular/core';

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
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.fd-dialog__body]': 'true'
    }
})
export class DialogBodyComponent {
}
