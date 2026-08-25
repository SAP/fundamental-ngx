import {
    ChangeDetectionStrategy,
    Component,
    computed,
    ElementRef,
    inject,
    input,
    ViewEncapsulation
} from '@angular/core';
import { FormStates } from '@fundamental-ngx/cdk/forms';
import { DynamicComponentService, HasElementRef } from '@fundamental-ngx/cdk/utils';
import { resolveTranslationSignalFn } from '@fundamental-ngx/i18n';
import { CSS_CLASS_NAME, getTypeClassName } from './constants';

let formMessageId = 0;

/**
 * Form message. Intended to be displayed with a form control for validation purposes.
 */
@Component({
    selector: 'fd-form-message',
    template: `@if (srOnlyMessage()) {
            <span class="fd-form-message__sr-only">{{ srOnlyMessage() }}</span>
        }
        <span><ng-content></ng-content></span>`,
    styleUrls: ['./form-message.component.scss'],
    host: {
        'aria-live': 'assertive',
        'aria-atomic': 'true',
        '[class]': 'cssClass()',
        '[attr.id]': 'id()'
    },
    providers: [DynamicComponentService],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormMessageComponent implements HasElementRef {
    /**
     * form-message id
     * if not set, a default value is provided
     */
    readonly id = input('fd-form-message-id-' + ++formMessageId);

    /** Type of the message. */
    readonly type = input<FormStates>('default');

    /** Whether message should be in static mode, without popover. It's mostly used for forms component, that contain dropdown */
    readonly static = input(false);

    /**
     * Screen reader message for the form message value state.
     * This message provides a text alternative for the state icon displayed with the form message.
     * If provided, this custom message will be announced to screen readers.
     * If not provided, a translated default message will be used based on the message type:
     * - `error`: "Invalid Entry" (represents error icon)
     * - `warning`: "Warning" (represents warning icon)
     * - `success`: "Success" (represents success icon)
     * - `information`: "Information" (represents information icon)
     * - `default`: No message
     */
    readonly valueStateMessage = input<string>('');

    /**
     * Whether message is used inside popovers or dialogs.
     * When it is enabled box shadow is removed and message is expanded to whole container width
     */
    readonly embedded = input(false);

    /** @hidden */
    readonly elementRef = inject(ElementRef);

    /** @hidden */
    protected readonly srOnlyMessage = computed(() => {
        const customMessage = this.valueStateMessage();
        if (customMessage) {
            return customMessage;
        }

        const type = this.type();
        switch (type) {
            case 'success':
                return this._translate('coreFormMessage.success')();
            case 'error':
                return this._translate('coreFormMessage.error')();
            case 'warning':
                return this._translate('coreFormMessage.warning')();
            case 'information':
                return this._translate('coreFormMessage.information')();
            default:
                return '';
        }
    });

    /** @hidden */
    protected readonly cssClass = computed(() =>
        [
            CSS_CLASS_NAME.message,
            this.static() ? CSS_CLASS_NAME.messageStatic : '',
            this.embedded() ? CSS_CLASS_NAME.messageEmbedded : '',
            getTypeClassName(this.type())
        ]
            .filter(Boolean)
            .join(' ')
    );

    /** @hidden */
    private readonly _translate = resolveTranslationSignalFn();
}
