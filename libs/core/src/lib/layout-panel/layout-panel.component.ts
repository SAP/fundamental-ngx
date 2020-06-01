import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';

/**
 * Layout Panels are used to encapsulate part of the content, form elements, lists, collections, etc., on a page.
 */
@Component({
    selector: 'fd-layout-panel',
    templateUrl: './layout-panel.component.html',
    host: {
        '[class.fd-has-display-block]': 'true'
    },
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./layout-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutPanelComponent extends AbstractFdNgxClass {
    /** @Input Background image of the panel. */
    @Input()
    backgroundImage: string;

    /** @hidden */
    @HostBinding('class.fd-layout-panel')
    fdLayoutPanelClass: boolean = true;

    /** @hidden */
    _setProperties() {
        if (this.backgroundImage) {
            this._addStyleToElement('background-image', 'url("' + this.backgroundImage + '")');
        }
    }

    /** @hidden */
    constructor(private elementRef: ElementRef) {
        super(elementRef);
    }
}
