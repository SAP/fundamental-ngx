import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    Input,
    OnInit,
    Optional,
    QueryList,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { TabComponent } from '../tab/tab.component';
import { KeyUtil, RtlService } from '@fundamental-ngx/core/utils';
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
export class TabsComponent implements OnInit, AfterViewInit {
    @Input() mode: TabMode = 'group';

    @ContentChildren(TabComponent)
    tabs: QueryList<TabComponent>;

    @ViewChildren(TabItemDirective)
    tabItems: QueryList<TabItemDirective>;

    _tabsList: TabComponent[] = [];

    private _currentActiveIndex = 0;

    private get _direction(): number {
        return this._rtl?.rtl.getValue() === true ? -1 : 1;
    }

    constructor(private _cd: ChangeDetectorRef, @Optional() private _rtl: RtlService) {}

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        this._tabsList = this.tabs.toArray();
        this.makeActiveTab();
        this._cd.detectChanges();
        this._listenToTabsChange();
    }

    makeActiveTab(): void {
        if (this.tabs.toArray().every((t) => !t.active)) {
            this.tabs.first.setActive(true);
        }
    }

    setActiveTab(index: number): void {
        const tabs = this.tabs.toArray();
        tabs[this._currentActiveIndex].setActive(false);
        this.tabs.toArray()[index].setActive(true);
        this._currentActiveIndex = index;

    }

    _tabHeaderKeyHandler(index: number, event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, [ENTER, SPACE])) {
            this.setActiveTab(index);
        } else if (KeyUtil.isKeyCode(event, RIGHT_ARROW)) {
            this._navigate(index, 1);
        } else if (KeyUtil.isKeyCode(event, LEFT_ARROW)) {
            this._navigate(index, -1);
        }

        console.log(event);
    }

    private _navigate(index, direction): void {
        const item = this.tabItems.get(index + this._direction * direction);
        item?.focus();
    }

    private _listenToTabsChange(): void {
        this.tabs.changes.subscribe(() => {
            this._tabsList = this.tabs.toArray();
            this.makeActiveTab();
            this._cd.detectChanges();
        });
    }
}
