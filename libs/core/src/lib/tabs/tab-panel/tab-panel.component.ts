import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    Optional,
    Output,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import { TabTitleDirective } from '../tab-utils/tab-directives';
import { TabItemState } from '../tab-item/tab-item.directive';
import { TabsService } from '../tabs.service';
import { Subject } from 'rxjs';
import { Nullable } from '@fundamental-ngx/core/shared';

let tabPanelUniqueId = 0;

export class TabPanelStateChange {
    constructor(public target: TabPanelComponent, public state: boolean) {}
}

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
        '[class.is-expanded]': 'expanded',
        '[attr.aria-expanded]': 'expanded ? true : null'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabPanelComponent implements OnChanges {
    /** Id of the tab. If none is provided, one will be generated. */
    @Input()
    id: string = 'fd-tab-panel' + tabPanelUniqueId++;

    /** Aria-label of the tab. Also applied to the tab header. */
    @Input()
    ariaLabel: Nullable<string>;

    /** Id of the element that labels the tab. Also applied to the tab header. */
    @Input()
    ariaLabelledBy: Nullable<string>;

    /** The title of tab, depending on mode used, it will be placed in different position */
    @Input()
    title: Nullable<string>;

    /** The count of tab, depending on mode used, it will be placed in different position */
    @Input()
    count: Nullable<string>;

    /** Glyph icon, it can be used only on  */
    @Input()
    glyph: string;

    /** Glyph icon, it can be used only on  */
    @Input()
    header = false;

    /** Disabled state for tab item */
    @Input()
    disabled = false;

    /** Semantic type of the tab item */
    @Input()
    tabState: Nullable<TabItemState>;

    /** Event that is emitted when the tab panel has been opened. */
    @Output()
    opened = new EventEmitter<void>();

    /** Event that is emitted when the tab panel has been closed. */
    @Output()
    closed = new EventEmitter<void>();

    /** @hidden */
    @ContentChild(TabTitleDirective, { read: TemplateRef })
    titleTemplate: TemplateRef<any>;

    /** @hidden Event that is emitted when the tab panel . */
    _expandedStateChange = new Subject<TabPanelStateChange>();

    /** @hidden Whether to display tab panel content */
    private _expanded = false;

    /** @hidden */
    constructor(
        public elementRef: ElementRef,
        private _changeDetRef: ChangeDetectorRef,
        @Optional() private _tabsService: TabsService
    ) {}

    /** @hidden
     * Thanks to OnPush change strategy detection on tab-list parent component,
     * every change of any property should be reported. */
    public ngOnChanges(): void {
        if (this._tabsService) {
            this._tabsService.tabPanelPropertyChanged.next();
        }
    }

    /** Whether tab panel content is expanded */
    get expanded(): boolean {
        return this._expanded;
    }

    /** Whether to expand tab panel content */
    open(open: boolean): void {
        this._expandedStateChange.next(new TabPanelStateChange(this, open));
    }

    /** @hidden Set new expand state */
    _expand(expanded: boolean): void {
        if (this._expanded !== expanded) {
            this._expanded = expanded;

            if (expanded) {
                this.opened.emit();
            } else {
                this.closed.emit();
            }

            this._changeDetRef.detectChanges();
        }
    }
}
