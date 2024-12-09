import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { Nullable, warnOnce } from '@fundamental-ngx/cdk/utils';
import { IconFont } from '@fundamental-ngx/core/icon';
import {
    InfoLabelComponent as CoreInfoLabelComponent,
    InfoLabelColorInput,
    LabelType
} from '@fundamental-ngx/core/info-label';

/**
 * @deprecated Use `InfoLabelComponent` from `@fundamental-ngx/core` instead.
 */
@Component({
    selector: 'fdp-info-label',
    templateUrl: './info-label.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CoreInfoLabelComponent]
})
export class InfoLabelComponent {
    /**
     * The LabelType represented by the info label .
     * Can be one of the following: 'numeric' | 'only-icon' | 'icon'
     * For default info label omit this property
     */
    @Input()
    type: LabelType;

    /**
     * The icon font
     * Options include: 'SAP-icons', 'BusinessSuiteInAppSymbols' and 'SAP-icons-TNT'
     */
    @Input()
    font: IconFont = 'SAP-icons';

    /** glyph define the icon of info label */
    @Input()
    glyph: string;

    /** glyph define the icon of info label */
    @Input()
    label: string;

    /** define the colour of the info label starting form 1 to 10 */
    @Input()
    color: Nullable<InfoLabelColorInput> = 7;

    /** Sets control aria-label attribute value */
    @Input()
    ariaLabel: Nullable<string>;

    /** Binds to control aria-labelledBy attribute */
    @Input()
    ariaLabelledBy: Nullable<string>;

    /** Sets control aria-title to a string attribute value */
    @Input()
    title: string;

    /** @hidden */
    constructor() {
        warnOnce(
            'InfoLabelComponent is deprecated. Use InfoLabelComponent from @fundamental-ngx/core/info-label instead.'
        );
    }
}
