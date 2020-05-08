import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';
import { LabelType } from '@fundamental-ngx/core';

@Component({
    selector: 'fdp-info-label',
    templateUrl: './info-label.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoLabelComponent {

    /**
     * The LabelType represented by the info label .
     * Can be one of the following: 'numeric' | 'only-icon' | 'icon'
     * For default info label omit this property
     */
    @Input()
    type: LabelType;

    /** glyph define the icon of info label */
    @Input()
    glyph: string;

    /**define the colour of the info label starting form 1 to 10 */
    @Input()
    color: string;

}
