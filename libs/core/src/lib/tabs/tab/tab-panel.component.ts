import { Component, ContentChild, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { TabTitleDirective } from '../tab-utils/tab-directives';

let tabPanelUniqueId: number = 0;

/**
 * Represents the body of a tab element. It also contains elements pertaining to the associated tab header.
 */
@Component({
    selector: 'fd-tab',
    templateUrl: './tab-panel.component.html',
    host: {
        role: 'tabpanel',
        class: 'fd-tabs__panel',
        '[attr.id]': 'id',
        '[attr.aria-expanded]': 'expanded ? true : null',
        '[class.is-expanded]': 'expanded'
    },
    encapsulation: ViewEncapsulation.None,
})
export class TabPanelComponent {

    /** @hidden */
    @ContentChild(TabTitleDirective, { read: TemplateRef, static: false })
    titleTemplate: TemplateRef<any>;

    /** The title of the tab header. */
    @Input()
    title: string;

    /** Aria-label of the tab. Also applied to the tab header. */
    @Input()
    ariaLabel: string;

    /** Id of the element that labels the tab. Also applied to the tab header. */
    @Input()
    ariaLabelledBy: string;

    /** Whether the tab is disabled. */
    @Input()
    disabled: boolean;

    /** Id of the tab. If none is provided, one will be generated. */
    @Input()
    id: string = 'fd-tab-panel' + tabPanelUniqueId++;

    /** @hidden */
    expanded = false;

    /** @hidden */
    index: number;
}
