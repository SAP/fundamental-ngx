import { ChangeDetectionStrategy, Component, Input, Optional } from '@angular/core';
import { FD_DEFAULT_ICON_FONT_FAMILY, IconComponent, IconFont } from '@fundamental-ngx/core/icon';
import { MessageBoxConfig, MessageBoxHost } from '../utils/message-box-config.class';

/**
 * Message box element representing the semantic icon in the message box header.
 *
 * ```html
 * <fd-message-box-semantic-icon></fd-message-box-semantic-icon>
 * ```
 */
@Component({
    selector: 'fd-message-box-semantic-icon',
    template: `<fd-icon [glyph]="_getIcon" [font]="glyphFont" role="presentation"></fd-icon>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [IconComponent],
    host: {
        role: 'presentation',
        '[attr.aria-hidden]': 'true'
    }
})
export class MessageBoxSemanticIconComponent {
    /** Custom semantic icon */
    @Input()
    glyph: string;

    /** Glyph font family */
    @Input()
    glyphFont: IconFont = FD_DEFAULT_ICON_FONT_FAMILY;

    /** @hidden */
    get messageBoxConfig(): MessageBoxConfig {
        return this.messageBox?._messageBoxConfig || {};
    }

    /** @hidden */
    constructor(@Optional() private messageBox?: MessageBoxHost) {}

    /** @hidden */
    get _showSemanticIcon(): boolean {
        return !!this.messageBoxConfig.showSemanticIcon;
    }

    /** @hidden */
    get _getIcon(): string {
        return this.glyph || this.messageBoxConfig.customSemanticIcon || this._semanticIcon;
    }

    /** @hidden */
    get _semanticIcon(): string {
        switch (this.messageBoxConfig.type) {
            case 'error':
                return 'error';
            case 'success':
                return 'sys-enter-2';
            case 'warning':
                return 'alert';
            case 'information':
                return 'information';
            case 'confirmation':
                return 'sys-help-2';
            default:
                return '';
        }
    }
}
