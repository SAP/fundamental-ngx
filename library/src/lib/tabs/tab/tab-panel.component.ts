import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { HashService } from '../../utils/hash.service';
import { TabTitleDirective } from '../tab-utils/tab-directives';

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
    providers: [HashService]
})
export class TabPanelComponent implements OnInit {

    /** @hidden */
    @ContentChild(TabTitleDirective, {read: TemplateRef})
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
    id: string;

    /** @hidden */
    expanded = false;

    /** @hidden */
    index: number;

    /** @hidden */
    constructor(private hasher: HashService) {}

    /** @hidden */
    ngOnInit(): void {
        if (!this.id) {
            this.id = this.hasher.hash();
        }
    }
}
