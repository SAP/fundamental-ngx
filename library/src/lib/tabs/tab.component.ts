import {
    AfterContentInit,
    Component, ContentChild, ElementRef, EventEmitter, Inject, Input, OnDestroy, Output,
    ViewEncapsulation
} from '@angular/core';
import { TabListComponent } from './tab-list/tab-list.component';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';
import { Subscription } from 'rxjs';

/**
 * Represents a list of tab-panels.
 */
@Component({
    selector: 'fd-tab',
    templateUrl: './tab.component.html',
    host: {
        role: 'tab',
        class: 'fd-tabs-custom'
    },
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['tab.component.scss']
})
export class TabComponent extends AbstractFdNgxClass implements AfterContentInit, OnDestroy {

    /** @hidden */
    @ContentChild(TabListComponent) tabListComponent: TabListComponent;

    /** Index of the selected tab panel. */
    @Input() selectedIndex: number = 0;

    /** Event emitted when the selected panel changes. */
    @Output() selectedIndexChange = new EventEmitter<number>();

    /** @hidden */
    selectedIndexChangeSubscription: Subscription;

    /** @hidden */
    constructor(@Inject(ElementRef) elementRef: ElementRef) {
        super(elementRef);
    }

    public ngAfterContentInit(): void {
        if (!this.tabListComponent.getActiveTabItemIndex()) {
            this.selectTab(this.selectedIndex);
        }
        if (this.tabListComponent) {
            this.selectedIndexChangeSubscription = this.tabListComponent.selectedIndexChange.subscribe(index =>
                this.selectedIndexChange.emit(index)
            );
        }
    }

    public ngOnDestroy(): void {
        if (this.selectedIndexChangeSubscription) {
            this.selectedIndexChangeSubscription.unsubscribe();
        }
    }

    _setProperties() {
        this.selectTab(this.selectedIndex)
    }

    public selectTab(index: number) {
        if (this.tabListComponent) {
            this.tabListComponent.selectTab(index);
        }
    }
}
