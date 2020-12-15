import { ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { Placement } from '../../popover/popover-position/popover-position';

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
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormLabelComponent implements OnChanges {
    /** Whether form is required */
    @Input()
    required = true;

    /** Whether form is required */
    @Input()
    colon = false;

    /** @deprecated */
    @Input()
    checkbox = false;

    /** @deprecated */
    @Input()
    radio = false;

    /** Whether label is for inline-help */
    @Input()
    inlineHelpTitle: string = null;

    /** Whether label is for inline-help */
    @Input()
    inlineHelpGlyph = 'question-mark';

    /** Whether label is for inline-help */
    @Input()
    inlineHelpBodyPlacement: Placement;

    /** Whether label is for inline-help */
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
