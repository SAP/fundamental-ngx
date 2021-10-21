import { ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { Placement } from '@fundamental-ngx/core/shared';

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
    // tslint:disable-next-line:component-selector
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

    /** Inline help body text */
    @Input()
    inlineHelpTitle: string = null;

    /** Glyph of icon triggering inline help */
    @Input()
    inlineHelpGlyph = 'question-mark';

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
    inlineHelpPlacement: 'before' | 'after' = 'after';

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
        this.inlineHelpAfter = this.inlineHelpTitle && this.inlineHelpPlacement === 'after';
    }
}
