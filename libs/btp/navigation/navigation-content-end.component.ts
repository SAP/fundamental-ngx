import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    QueryList,
    ViewEncapsulation
} from '@angular/core';
import { Subject, startWith } from 'rxjs';
import { NavigationContentComponent } from './navigation-content.token';
import { FdbNavigationListItemComponent } from './navigation-list-item-component.token';

@Component({
    selector: 'fdb-navigation-content-end',
    template: ` <ng-content></ng-content> `,
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: NavigationContentComponent,
            useExisting: NavigationContentEndComponent
        }
    ],
    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
    host: {
        class: 'fd-navigation__container fd-navigation__container--bottom'
    }
})
export class NavigationContentEndComponent extends NavigationContentComponent implements AfterViewInit {
    /** @hidden */
    @ContentChildren(FdbNavigationListItemComponent, { descendants: true })
    private readonly _listItems: QueryList<FdbNavigationListItemComponent>;

    /** @hidden */
    showHome = false;

    /** @hidden */
    override refresh$ = new Subject<void>();

    /** @hidden */
    ngAfterViewInit(): void {
        this._listItems.changes.pipe(startWith(null)).subscribe(() => {
            this.refresh$.next();
        });
    }

    /** @hidden */
    getNavigatableItems(): FdbNavigationListItemComponent[] {
        return this._listItems.toArray();
    }

    /** @hidden */
    override showMoreOpened(): boolean {
        return false;
    }
}
