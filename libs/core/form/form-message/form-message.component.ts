import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    inject,
    input,
    OnChanges,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { FormStates } from '@fundamental-ngx/cdk/forms';
import { applyCssClass, CssClassBuilder, DynamicComponentService } from '@fundamental-ngx/cdk/utils';
import { ValueStateAriaMessageService } from '@fundamental-ngx/core/shared';
import { CSS_CLASS_NAME, getTypeClassName } from './constants';

let formMessageId = 0;

@Component({
    selector: 'fd-form-message',
    template: `<span class="fd-form-message__sr-only"> {{ valueStateMessages[type()]?.() }} </span
        ><ng-content></ng-content>`,
    styleUrl: './form-message.component.scss',
    host: {
        'aria-live': 'assertive',
        'aria-atomic': 'true',
        '[attr.id]': 'id()'
    },
    providers: [DynamicComponentService],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class FormMessageComponent implements CssClassBuilder, OnInit, OnChanges {
    /** Type of the message. */
    type = input<FormStates>('default');

    /** Whether message should be in static mode, without popover. It's mostly used for forms component, that contain dropdown */
    static = input(false);

    /**
     * Whether message is used inside popovers or dialogs.
     * When it is enabled box shadow is removed and message is expanded to whole container width
     */
    embedded = input(false);

    /** User's custom classes */
    class = input<string>();

    /**
     * Value state "success" message.
     */
    valueStateSuccessMessage = input<string>(inject(ValueStateAriaMessageService).success);

    /**
     * Value state "information" message.
     */
    valueStateInformationMessage = input<string>(inject(ValueStateAriaMessageService).information);

    /**
     * Value state "warning" message.
     */
    valueStateWarningMessage = input<string>(inject(ValueStateAriaMessageService).warning);

    /**
     * Value state "error" message.
     */
    valueStateErrorMessage = input<string>(inject(ValueStateAriaMessageService).error);

    /** Form Message Text ID
     *  Default value is provided if not set  */
    id = input('fd-form-message-' + ++formMessageId);

    /** @hidden */
    valueStateMessages = {
        success: this.valueStateSuccessMessage,
        information: this.valueStateInformationMessage,
        warning: this.valueStateWarningMessage,
        error: this.valueStateErrorMessage
    } as const;

    /** @hidden */
    elementRef: ElementRef<HTMLElement> = inject(ElementRef);

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [
            CSS_CLASS_NAME.message,
            this.static() ? CSS_CLASS_NAME.messageStatic : '',
            this.embedded() ? CSS_CLASS_NAME.messageEmbedded : '',
            getTypeClassName(this.type()),
            this.class()
        ].filter(Boolean) as string[];
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }
}
