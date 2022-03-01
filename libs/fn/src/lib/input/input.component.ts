import {
    Component,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    ElementRef,
    ChangeDetectorRef,
    OnInit,
    OnChanges,
    Input,
    Optional,
    Inject
} from '@angular/core';
import { InputBase } from './input-base';
import { applyCssClass } from '@fundamental-ngx/core/utils';
import { DisabledBehavior, FN_DISABLED, FN_READONLY, ReadonlyBehavior } from '@fundamental-ngx/fn/cdk';

@Component({
    selector: 'fn-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent extends InputBase implements OnInit, OnChanges {
    /** User's custom classes */
    @Input()
    class = '';

    /** @hidden */
    constructor(
        private _elementRef: ElementRef,
        private _cdr: ChangeDetectorRef,
        @Optional() @Inject(FN_DISABLED) disabled$: DisabledBehavior,
        @Optional() @Inject(FN_READONLY) readonly$: ReadonlyBehavior
    ) {
        super(_cdr, disabled$, readonly$);
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string[] {
        return [this.class];
    }

    /** @hidden */
    elementRef(): ElementRef {
        return this._elementRef;
    }
}
