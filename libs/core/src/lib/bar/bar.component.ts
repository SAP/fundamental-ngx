import {
    AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, ViewEncapsulation
} from '@angular/core';
import { CssClassBuilder, applyCssClass } from '../utils/public_api';

export type SizeType = 's' | 'm_l' | 'xl';
export type BarDesignType = 'header' | 'subheader' | 'header-with-subheader' | 'footer' | 'floating-footer';

/**
 * The Bar component is a container that holds titles, buttons and input controls. 
 * Its content is distributed in three areas - left, middle and right.
 * The Bar has 2 modes - Desktop (default) and Tablet/Mobile (cosy).
 */
@Component({
    selector: 'fd-bar',
    templateUrl: './bar.component.html',
    styleUrls: ['./bar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarComponent {

    /** Whether to apply cosy mode to the Bar. */
    @Input() cosy: boolean = false;

    /** Whether the Bar component is used as a header, subheader, header-with-subheader,
     * footer or floating-footer. */
    @Input() barDesign: BarDesignType = null;

    /** Whether the Bar component is used in Page Layout. */
    @Input() inPage: boolean = false;

    /** Whether the Bar component is used in Home Page Layout. */
    @Input() inHomePage: boolean = false;

    /** The size of the Page in Page responsive design. */
    @Input() size: SizeType = null;

}
