import { Component, ContentChild, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { TabItemDirective } from '../tab-item/tab-item.directive';

/**
 * Represents the body of a tab element. It also contains elements pertaining to the associated tab header.
 */
@Component({
    selector: 'fd-tab-panel',
    templateUrl: './tab-panel.component.html',
    host: {
        role: 'tabpanel',
        class: 'fd-tabs__panel',
        '[attr.id]': 'id',
        '[attr.aria-expanded]': 'expanded ? true : null',
        '[class.is-expanded]': 'expanded'
    },
    encapsulation: ViewEncapsulation.None
})
export class TabPanelComponent {

    /** Aria-label of the tab. Also applied to the tab header. */
    @Input()
    ariaLabel: string;

    /** Id of the element that labels the tab. Also applied to the tab header. */
    @Input()
    ariaLabelledBy: string;

    /** Id of the tab*/
    @Input()
    id: string;

    /** @hidden */
    expanded = false;

    /** @hidden */
    index: number;
}
