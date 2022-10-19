import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    OnDestroy,
    QueryList,
    ViewEncapsulation
} from '@angular/core';
import { CardFooterActionItemDirective } from './card-footer-action-item.directive';
import { map, startWith, Subject, tap } from 'rxjs';

@Component({
    selector: 'fd-card-footer',
    templateUrl: './card-footer.component.html',
    host: {
        class: 'fd-card__footer'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardFooterComponent implements AfterViewInit, OnDestroy {
    /** @hidden */
    @ContentChildren(CardFooterActionItemDirective) cardActionItems: QueryList<CardFooterActionItemDirective>;

    /** @hidden */
    actionItems: CardFooterActionItemDirective[];

    /** @hidden */
    private _destroyed$ = new Subject<void>();

    /** @hidden */
    constructor(private _changeDetectorRef: ChangeDetectorRef) {}

    /** @hidden */
    ngAfterViewInit(): void {
        this.cardActionItems.changes
            .pipe(
                startWith(this.cardActionItems),
                map(() => this.cardActionItems.toArray()),
                tap((items) => (this.actionItems = items)),
                tap(() => this._changeDetectorRef.detectChanges())
            )
            .subscribe();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._destroyed$.next();
        this._destroyed$.complete();
    }
}
