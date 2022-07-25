import {
    Component,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    Input,
    EventEmitter,
    Output,
    HostBinding
} from '@angular/core';
import { IconFont } from '@fundamental-ngx/core/icon';

export type MessageStripState = 'information' | 'success' | 'warning' | 'error';

@Component({
    selector: 'fn-message-strip',
    templateUrl: './message-strip.component.html',
    styleUrls: ['./message-strip.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageStripComponent {
    /** Message strip state */
    @Input()
    state: MessageStripState = 'information';

    /** @hidden User-defined classes */
    @Input()
    class: string | null = null;

    /** The icon name to display. See the icon page for the list of icons
     * here: https://sap.github.io/fundamental-ngx/icon
     * */
    @Input()
    glyph: string | null = null;

    /**
     * The icon font
     * Options include: 'SAP-icons', 'BusinessSuiteInAppSymbols' and 'SAP-icons-TNT'
     */
    @Input()
    font: IconFont = 'SAP-icons';

    /** Aria-label for Icon. */
    @Input()
    iconAriaLabel: string | null = null;

    /** Aria-label of the dismiss button. Default is Close */
    @Input()
    dismissButtonAriaLabel = 'Close';

    /** Message strip text */
    @Input()
    label: string | null = null;

    /** Whether message strip is dismissible. Default is true */
    @Input()
    @HostBinding('class.fn-message-strip--dismissible')
    dismissible = true;

    /** Event when message strip is dismissed. */
    @Output()
    dismiss = new EventEmitter<void>();

    /** @hidden */
    @HostBinding('[attr.class]')
    private get _messageStripClass(): string {
        return ['fn-message-strip', this.class, `fn-message-strip--${this.state}`].filter((c) => !!c).join(' ');
    }
}
