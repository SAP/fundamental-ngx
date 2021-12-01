import { ChangeDetectionStrategy, Component, Input, Optional } from '@angular/core';
import {
    MESSAGE_BOX_CONFIGURABLE_ELEMENT,
    MessageBoxConfig,
    MessageBoxConfigurableElement
} from '../utils/message-box-config.class';

/**
 * Message box element representing the semantic icon in the message box header.
 *
 * ```html
 * <fd-message-box-semantic-icon></fd-message-box-semantic-icon>
 * ```
 */
@Component({
    selector: 'fd-message-box-semantic-icon',
    template: `<i [class]="'sap-icon--' + _getIcon" role="presentation"></i>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        { provide: MESSAGE_BOX_CONFIGURABLE_ELEMENT, useExisting: MessageBoxSemanticIconComponent, multi: true }
    ]
})
export class MessageBoxSemanticIconComponent implements MessageBoxConfigurableElement {
    /** Custom semantic icon */
    @Input()
    glyph: string;

    /** @hidden */
    constructor(@Optional() public messageBoxConfig: MessageBoxConfig) {
        this.messageBoxConfig = this.messageBoxConfig || {};
    }

    /** @hidden */
    get _showSemanticIcon(): boolean {
        return this.messageBoxConfig.showSemanticIcon;
    }

    /** @hidden */
    get _getIcon(): string {
        return this.glyph || this.messageBoxConfig.customSemanticIcon || this._semanticIcon;
    }

    /** @hidden */
    get _semanticIcon(): string {
        switch (this.messageBoxConfig.type) {
            case 'error':
                return 'message-error';
            case 'success':
                return 'message-success';
            case 'warning':
                return 'message-warning';
            case 'information':
                return 'message-information';
            case 'confirmation':
                return 'question-mark';
            default:
                return '';
        }
    }
}
