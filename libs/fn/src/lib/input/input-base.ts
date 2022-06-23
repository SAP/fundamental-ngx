/**
 * This abstract class contains common functionality that will be used by many different input components, such as the input, text area,
 * select, multi-input etc.
 */

import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { AfterViewInit, ChangeDetectorRef, Directive, Input, OnDestroy } from '@angular/core';
import { DisabledBehavior, ReadonlyBehavior } from '@fundamental-ngx/fn/cdk';
import { Subscription, merge, Observable } from 'rxjs';

export type InputState = 'positive' | 'critical' | 'negative' | 'info';

@Directive()
export abstract class InputBase implements AfterViewInit, OnDestroy {
    /** Placeholder for the input. */
    @Input()
    placeholder: string;

    /** Whether this input is the 'display' type. */
    @Input()
    set display(value: BooleanInput) {
        this._display = coerceBooleanProperty(value);
    }

    get display(): boolean {
        return this._display;
    }

    /** The state of the input. */
    @Input()
    state: InputState;

    /** Whethert this input is disabled. */
    disabled: boolean | undefined;

    /** Whether this input has been disabled via Angular Forms. */
    disabledByForm: boolean;

    /** Whether this input is readonly. */
    readonly: boolean | undefined;

    _display: boolean;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    protected constructor(
        protected _cdRef: ChangeDetectorRef,
        protected disabled$?: DisabledBehavior,
        protected readonly$?: ReadonlyBehavior
    ) {}

    /** @hidden */
    ngAfterViewInit(): void {
        this._setDisableReadonlyProperties();
        this._listenToDisablingEvents();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    private _listenToDisablingEvents(): void {
        const disablingEvents$: Observable<boolean>[] = [];
        if (this.disabled$) {
            disablingEvents$.push(this.disabled$);
        }
        if (this.readonly$) {
            disablingEvents$.push(this.readonly$);
        }
        this._subscriptions.add(merge(...disablingEvents$).subscribe(() => this._setDisableReadonlyProperties()));
    }

    /** @hidden */
    protected _setDisableReadonlyProperties(): void {
        if (this.disabledByForm) {
            this.disabled = true;
        } else {
            this.disabled = this.disabled$?.fnDisabled;
        }
        this.readonly = this.readonly$?.fnReadonly;
        this._cdRef.detectChanges();
    }
}
