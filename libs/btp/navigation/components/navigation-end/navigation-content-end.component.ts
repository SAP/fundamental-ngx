import { NgForOf, NgTemplateOutlet } from '@angular/common';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    QueryList,
    ViewEncapsulation,
    signal
} from '@angular/core';
import { asyncScheduler, observeOn, startWith } from 'rxjs';
import { FdbNavigationContentContainer } from '../../models/navigation-content-container.class';
import { FdbNavigationListItem } from '../../models/navigation-list-item.class';
import { NavigationListComponent } from '../navigation-list/navigation-list.component';

@Component({
    selector: 'fdb-navigation-content-end',
    template: `<ul fdb-navigation-list [listItems]="totalListItems$()"></ul>`,
    standalone: true,
    imports: [NavigationListComponent, NgForOf, NgTemplateOutlet],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
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
    /** @hidden */
    @ContentChildren(FdbNavigationListItem, { descendants: false })
    listItems: QueryList<FdbNavigationListItem>;

    /** Whether the container is placed on the start position, or the end position of the navigation. */
    readonly placement: 'start' | 'end' = 'end';

    /** @hidden */
    readonly totalListItems$ = signal<FdbNavigationListItem[]>([]);

    /** @hidden */
    ngAfterContentInit(): void {
        this.listItems.changes.pipe(startWith(null), observeOn(asyncScheduler)).subscribe(() => {
            this.totalListItems$.set(this.listItems.toArray());
        });
    }
}
