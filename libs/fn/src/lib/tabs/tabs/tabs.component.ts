import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    Input,
    Optional,
    QueryList,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { TabComponent } from '../tab/tab.component';
import { KeyUtil, RtlService } from '@fundamental-ngx/cdk/utils';
import { ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE } from '@angular/cdk/keycodes';
import { TabItemDirective } from '../tab-item.directive';

export type TabMode = 'group' | 'individual' | 'line';

@Component({
    selector: 'fn-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TabsComponent implements AfterViewInit {
    /**
     * The mode of the tabs.
     * Options include group(default), individual and line
     */
    @Input()
    mode: TabMode = 'group';

    /** @hidden */
    @ContentChildren(TabComponent)
    tabs: QueryList<TabComponent>;

    /** @hidden */
    @ViewChildren(TabItemDirective)
    tabItems: QueryList<TabItemDirective>;

    /** @hidden */
    _tabsList: TabComponent[] = [];

    /** @hidden */
    private _currentActiveIndex = 0;

    /** @hidden */
    private get _direction(): number {
        return this._rtl?.rtl.getValue() === true ? -1 : 1;
    }

    /** @hidden */
    constructor(private _cd: ChangeDetectorRef, @Optional() private _rtl: RtlService) {}

    /** @hidden */
    ngAfterViewInit(): void {
        this._tabsList = this.tabs.toArray();
        this.makeActiveTab();
        this._cd.detectChanges();
        this._listenToTabsChange();
    }

    /** A function to make tab active */
    makeActiveTab(): void {
        if (this.tabs.toArray().every((t) => !t.active)) {
            this.tabs.first.setActive(true);
        }
    }

    /** A function to set the active state of the tab */
    setActiveTab(index: number): void {
        const tabs = this.tabs.toArray();
        tabs[this._currentActiveIndex].setActive(false);
        this.tabs.toArray()[index].setActive(true);
        this._currentActiveIndex = index;
    }

    /** @hidden */
    _tabHeaderKeyHandler(index: number, event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, [ENTER, SPACE])) {
            event.preventDefault();
            this.setActiveTab(index);
        } else if (KeyUtil.isKeyCode(event, RIGHT_ARROW)) {
            this._navigate(index, 1);
        } else if (KeyUtil.isKeyCode(event, LEFT_ARROW)) {
            this._navigate(index, -1);
        }
    }

    /** @hidden */
    private _navigate(index: number, direction: number): void {
        const nextIndex = index + this._direction * direction;
        const nextTab = this.tabItems.find(
            (item, idx) => !item.disabled && (direction === 1 ? idx >= nextIndex : idx <= nextIndex)
        );
        nextTab?.focus();
    }

    /** @hidden */
    private _listenToTabsChange(): void {
        this.tabs.changes.subscribe(() => {
            this._tabsList = this.tabs.toArray();
            this.makeActiveTab();
            this._cd.detectChanges();
        });
    }
}
