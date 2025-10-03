import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { InlineHelpDirective } from '@fundamental-ngx/core/inline-help';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { TriggerConfig } from '@fundamental-ngx/core/popover';
import { Placement } from '@fundamental-ngx/core/shared';
import { InlineHelpFormPlacement } from '../inline-help-placement.type';

let formLabelIdCount = 0;

/**
 * Label to be linked to a form control.
 *
 * ```html
 * <label fd-form-label for="input-id">Label Text</label>
 * <input fd-form-control type="text" id="input-id" />
 * ```
 */
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fd-form-label]',
    templateUrl: './form-label.component.html',
    styleUrl: './form-label.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    host: {
        '[attr.id]': 'id()',
        class: 'fd-form-label__wrapper',
        '[class.fd-form-label__wrapper--align-end]': 'alignLabelEnd()',
        '[class.fd-form-label__wrapper--inline-help]': '!!inlineHelpContent()',
        '[class.fd-form-label__wrapper--inline-help--after]':
            '!!inlineHelpContent() && inlineHelpPlacement() === "after"'
    },
    imports: [LinkComponent, IconComponent, InlineHelpDirective, NgTemplateOutlet]
})
export class FormLabelComponent {
    /** Whether form is required. */
    required = input(false);

    /** Whether label text should be appended with colon. */
    colon = input(false);

    /** Align label on end. */
    alignLabelEnd = input(false);

    /** Inline help content. Could be just a string or complex template */
    inlineHelpContent = input<string | TemplateRef<any>>('');

    /** Glyph of icon triggering inline help. */
    inlineHelpGlyph = input('question-mark');

    /** Trigger event names for the inline help. */
    inlineHelpTriggers = input<(string | TriggerConfig)[]>([
        'mouseenter',
        'mouseleave',
        'focusin',
        'focusout',
        { trigger: 'click', openAction: true, closeAction: true }
    ]);

    /**
     * The placement of the inline help.
     * It can be one of:
     * top, top-start, top-end, bottom, bottom-start, bottom-end,
     * right, right-start, right-end, left, left-start, left-end.
     */
    inlineHelpBodyPlacement = input<Placement>('bottom-start');

    /** If inline help trigger icon should be placed after, or before text. */
    inlineHelpPlacement = input<InlineHelpFormPlacement>('after');

    /** Whether to allow the text of the form label to wrap. */
    allowWrap = input(false);

    /** ID of the label. A default value is provided if not set. */
    id = input(`fd-form-label-${++formLabelIdCount}`);

    /** Inline help label */
    inlineHelpLabel = input<Nullable<string>>(null);

    get inlineHelpContentValue(): string | TemplateRef<any> {
        return this.inlineHelpContent();
    }

    /** Computed inline help label */
    computedInlineHelpLabel = computed(() => {
        const label = this.inlineHelpLabel();
        if (label) {
            return label;
        }
        const content = this.inlineHelpContent();
        return typeof content === 'string' ? content : '';
    });
}
