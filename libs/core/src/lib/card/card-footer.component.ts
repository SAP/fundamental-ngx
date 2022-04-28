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
import { CardActionItemDirective } from './card-action-item.directive';
import { map, startWith, Subject, tap } from 'rxjs';

@Component({
    selector: 'fd-card-footer',
    templateUrl: './card-footer.component.html',
    host: {
        ['[class.fd-card__footer]']: 'true'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardFooterComponent implements AfterViewInit, OnDestroy {
    @ContentChildren(CardActionItemDirective) cardActionItems: QueryList<CardActionItemDirective>;
    actionItems: CardActionItemDirective[];

    private _destroyed$ = new Subject<void>();

    constructor(private _changeDetectorRef: ChangeDetectorRef) {}

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

    ngOnDestroy(): void {
        this._destroyed$.next();
        this._destroyed$.complete();
    }
}
