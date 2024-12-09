import { NgTemplateOutlet } from '@angular/common';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    Input,
    QueryList,
    ViewEncapsulation,
    signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { asyncScheduler, filter, observeOn, startWith } from 'rxjs';
import { FdbNavigationContentContainer } from '../../models/navigation-content-container.class';
import { FdbNavigationListItem } from '../../models/navigation-list-item.class';
import { NavigationListComponent } from '../navigation-list/navigation-list.component';

@Component({
    selector: 'fdb-navigation-content-end',
    template: `<ul fdb-navigation-list [listItems]="allListItems$()"></ul>`,
    imports: [NavigationListComponent, NgTemplateOutlet],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'fd-navigation__container fd-navigation__container--bottom'
    },
    providers: [
        {
            provide: FdbNavigationContentContainer,
            useExisting: NavigationContentEndComponent
        }
    ]
})
export class NavigationContentEndComponent extends FdbNavigationContentContainer implements AfterContentInit {
    /** Whether the list items are content-projected. Used only with data-driven navigation. */
    @Input()
    contentProjected = true;
    /** @hidden */
    @ContentChildren(FdbNavigationListItem, { descendants: false })
    private readonly _listItems: QueryList<FdbNavigationListItem>;

    /** @hidden */
    readonly listItems$ = signal<FdbNavigationListItem[]>([]);

    /** Whether the container is placed on the start position, or the end position of the navigation. */
    readonly placement: 'start' | 'end' = 'end';

    /** @hidden */
    ngAfterContentInit(): void {
        this._listItems.changes
            .pipe(
                startWith(null),
                observeOn(asyncScheduler),
                filter(() => this.contentProjected),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe(() => {
                this.allListItems$.set(this._listItems.toArray());
                this.listItems$.set(this._listItems.toArray());
            });
    }
}
