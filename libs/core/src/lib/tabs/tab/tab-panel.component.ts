import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    Input,
    OnChanges, Optional,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import { TabTitleDirective } from '../tab-utils/tab-directives';
import { TabItemState } from '../tab-item/tab-item.directive';
import { TabsService } from '../tabs.service';

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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabPanelComponent implements OnChanges {

    /** @hidden */
    @ContentChild(TabTitleDirective, { read: TemplateRef })
    titleTemplate: TemplateRef<any>;

    /** Id of the tab. If none is provided, one will be generated. */
    @Input()
    id: string = 'fd-tab-panel' + tabPanelUniqueId++;

    /** @hidden
     * Flag to inform if body for this tab should be displayed
     */
    expanded: boolean = false;

    /** @hidden */
    index: number;

    /** Aria-label of the tab. Also applied to the tab header. */
    @Input()
    ariaLabel: string;

    /** Id of the element that labels the tab. Also applied to the tab header. */
    @Input()
    ariaLabelledBy: string;

    /** The title of tab, depending on mode used, it will be placed in different position */
    @Input()
    title: string;

    /** The count of tab, depending on mode used, it will be placed in different position */
    @Input()
    count: string;

    /** Glyph icon, it can be used only on  */
    @Input()
    glyph: string;

    /** Glyph icon, it can be used only on  */
    @Input()
    header: boolean = false;

    /** Semantic type of the tab item */
    @Input()
    tabState: TabItemState;

    /** @hidden */
    constructor(
        private _changeDetRef: ChangeDetectorRef,
        @Optional() private _tabsService: TabsService
    ) {}

    /** @hidden
     * Thanks to OnPush change strategy detection on tab-list parent component,
     * every change of any property should be reported.
     */
    public ngOnChanges(): void {
        if (this._tabsService) {
            this._tabsService.tabPanelPropertyChanged.next();
        }
    }

    /** @hidden
     * Method to change the state of expanded flag */
    triggerExpandedPanel(expanded: boolean): void {
        this.expanded = expanded;
        this._changeDetRef.detectChanges();
    }
}
