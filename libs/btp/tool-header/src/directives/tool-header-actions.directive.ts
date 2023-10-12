/* eslint-disable @angular-eslint/no-input-rename */
import { ContentChildren, DestroyRef, Directive, inject, Input, QueryList, Signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, combineLatest, map, startWith, Subscription } from 'rxjs';
import { FdbToolHeaderActionButton } from '../tool-header-action-button.type';
import { ToolHeaderActionDirective } from './tool-header-action.directive';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fdb-tool-header-actions',
    standalone: true
})
export class ToolHeaderActionsDirective {
    /**
     * Actions to be displayed in the header.
     */
    @Input()
    set actions(actions: FdbToolHeaderActionButton[] | Array<FdbToolHeaderActionButton[]>) {
        this._inputActions$.next(
            (actions as any).reduce(
                (
                    acc: FdbToolHeaderActionButton[],
                    actionOrActionGroup: FdbToolHeaderActionButton[] | FdbToolHeaderActionButton,
                    index: number
                ) => {
                    if (Array.isArray(actionOrActionGroup)) {
                        acc.push(...actionOrActionGroup);
                        if (index !== (actions as any).length - 1) {
                            acc[acc.length - 1].hasSeparator = true;
                        }
                    } else {
                        acc.push(actionOrActionGroup);
                    }
                    return acc;
                },
                []
            )
        );
    }

    /** @hidden */
    @ContentChildren(ToolHeaderActionDirective)
    set _actionsFromContent(actions: QueryList<ToolHeaderActionDirective>) {
        if (this._contentActionsSubscription) {
            this._contentActionsSubscription.unsubscribe();
            this._contentActionsSubscription = undefined;
        }
        this._contentActionsSubscription = actions.changes
            .pipe(
                startWith(actions),
                map((ql: QueryList<ToolHeaderActionDirective>) => ql.toArray()),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe((_actions: ToolHeaderActionDirective[]) => {
                this._contentActions$.next(_actions);
            });
    }

    /** @hidden */
    _actions: Signal<FdbToolHeaderActionButton[]>;
    /** @hidden */
    protected _contentActions$ = new BehaviorSubject<FdbToolHeaderActionButton[]>([]);

    /** @hidden */
    protected _inputActions$ = new BehaviorSubject<FdbToolHeaderActionButton[]>([]);

    /** @hidden */
    private _destroyRef = inject(DestroyRef);

    /** @hidden */
    private _contentActionsSubscription?: Subscription;

    /** @hidden */
    constructor() {
        this._actions = toSignal(
            combineLatest([this._contentActions$, this._inputActions$]).pipe(
                map(([contentActions, inputActions]) => [...contentActions, ...inputActions])
            ),
            { requireSync: true }
        );
    }
}
