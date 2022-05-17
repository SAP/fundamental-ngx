import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Host,
    HostBinding,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    SkipSelf,
    ViewEncapsulation
} from '@angular/core';
import { FormStates } from '@fundamental-ngx/core/shared';
import { Subscription } from 'rxjs';
import { ContentDensityService, CssClassBuilder, applyCssClass } from '@fundamental-ngx/core/utils';
import { FormItemComponent } from '../form-item/form-item.component';

/**
 * Directive intended for use on form controls.
 *
 * ```html
 * <input type="text" fd-form-control />
 * ```
 */
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fn-form-control]',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./form-control.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormControlComponent implements CssClassBuilder, OnInit, OnChanges, OnDestroy {
    /**
     *  The state of the form control - applies css classes.
     *  Can be `success`, `error`, `warning`, `information` or blank for default.
     */
    @Input()
    set state(value: FormStates) {
        this._state = value;

        if (this._formItem) {
            this._formItem.state = value;
            this._formItem.updateState();
        }
    }

    get state(): FormStates {
        return this._state;
    }

    @Input()
    @HostBinding('disabled')
    set disabled(value: boolean) {
        this._disabled = value;
        if (this._formItem) {
            this._formItem.disabled = value;
            this._formItem.updateState();
        }
    }

    get disabled(): boolean {
        return this._disabled;
    }

    @Input()
    @HostBinding('readonly')
    set readonly(value: boolean) {
        this._readonly = value;

        if (this._formItem) {
            this._formItem.readonly = value;
            this._formItem.updateState();
        }
    }

    get readonly(): boolean {
        return this._readonly;
    }

    /**
     * Whether form is in compact mode
     */
    @Input()
    compact?: boolean;

    @Input()
    type: string;

    /** user's custom classes */
    @Input()
    class: string;

    /** @hidden */
    private _subscriptions = new Subscription();

    private _state: FormStates;

    private _disabled = false;

    private _readonly = false;

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string[] {
        return [this._getFormClass(), this.compact ? this._getFormClass() + '--compact' : '', this.class];
    }

    private _getFormClass(): string {
        switch (this._getElementTag()) {
            case 'input':
                return 'fn-text-field__input';
            case 'textarea':
                return 'fn-text-field__textarea';
        }
        return '';
    }

    /** @hidden */
    constructor(
        private _elementRef: ElementRef,
        @Optional() private _contentDensityService: ContentDensityService,
        @Optional() @SkipSelf() @Host() private _formItem: FormItemComponent
    ) {}

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
        if (this.compact === undefined && this._contentDensityService) {
            this._subscriptions.add(
                this._contentDensityService._isCompactDensity.subscribe((isCompact) => {
                    this.compact = isCompact;
                    this.buildComponentCssClass();
                })
            );
        }
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }

    /** @hidden */
    private _getElementTag(): string | undefined {
        if (this.elementRef() && this.elementRef().nativeElement) {
            return this.elementRef().nativeElement.tagName.toLocaleLowerCase();
        }
    }
}
