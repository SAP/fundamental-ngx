import { ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { Placement, Nullable } from '@fundamental-ngx/core/shared';
import { InlineHelpFormPlacement } from '../inline-help-placement.type';

/**
 * Label to be linked to a form control.
 *
 * ```html
 * <label fd-form-label for="input-id">Label Text</label>
 * <input fd-form-control type="text" id="input-id" />
 * ```
 */
@Component({
    // TODO to be discussed
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fd-form-label]',
    templateUrl: './form-label.component.html',
    styleUrls: ['./form-label.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormLabelComponent implements OnChanges {
    /** Whether form is required */
    @Input()
    required = false;

    /** Whether form is required */
    @Input()
    colon = false;

    /** @deprecated */
    @Input()
    checkbox = false;

    /** @deprecated */
    @Input()
    radio = false;

    /** Align label on end */
    @Input()
    @HostBinding('class.fd-form-label__wrapper--align-end')
    alignLabelEnd = false;

    /** Inline help body text */
    @Input()
    inlineHelpTitle: Nullable<string> = null;

    /** Glyph of icon triggering inline help */
    @Input()
    inlineHelpGlyph = 'question-mark';

    /** Trigger event names for the inline help */
    @Input()
    inlineHelpTriggers: string[] = ['mouseenter', 'mouseleave', 'focusin', 'focusout'];

    /**
     * The placement of the inline help.
     * It can be one of:
     * top, top-start, top-end, bottom, bottom-start, bottom-end,
     * right, right-start, right-end, left, left-start, left-end.
     */
    @Input()
    inlineHelpBodyPlacement: Placement;

    /** If inline help trigger icon should be placed after, or before text */
    @Input()
    inlineHelpPlacement: InlineHelpFormPlacement = 'after';

    /** @hidden */
    @HostBinding('class.fd-form-label__wrapper')
    defaultClass = true;

    /** @hidden */
    @HostBinding('class.fd-form-label__wrapper--inline-help')
    inlineHelpClass = true;
    /** @hidden */
    @HostBinding('class.fd-form-label__wrapper--inline-help--after')
    inlineHelpAfter = true;

    /** @hidden */
    ngOnChanges(): void {
        this.inlineHelpClass = !!this.inlineHelpTitle;
        this.inlineHelpAfter = !!this.inlineHelpTitle && this.inlineHelpPlacement === 'after';
    }
}
