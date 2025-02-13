import { NgTemplateOutlet } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    DestroyRef,
    QueryList,
    ViewEncapsulation,
    inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map, startWith, tap } from 'rxjs';
import { CardFooterActionItemDirective } from './card-footer-action-item.directive';

@Component({
    selector: 'fd-card-footer',
    templateUrl: './card-footer.component.html',
    host: {
        class: 'fd-card__footer'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgTemplateOutlet]
})
export class CardFooterComponent implements AfterViewInit {
    /** @hidden */
    @ContentChildren(CardFooterActionItemDirective) cardActionItems: QueryList<CardFooterActionItemDirective>;

    /** @hidden */
    actionItems: CardFooterActionItemDirective[];

    /** @hidden */
    private _destroyed$ = inject(DestroyRef);

    /** @hidden */
    constructor(private _changeDetectorRef: ChangeDetectorRef) {}

    /** @hidden */
    ngAfterViewInit(): void {
        this.cardActionItems.changes
            .pipe(
                startWith(this.cardActionItems),
                map(() => this.cardActionItems.toArray()),
                tap((items) => (this.actionItems = items)),
                tap(() => this._changeDetectorRef.detectChanges()),
                takeUntilDestroyed(this._destroyed$)
            )
            .subscribe();
    }
}
