import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostBinding,
    Inject,
    Input,
    OnDestroy,
    Optional,
    ViewEncapsulation
} from '@angular/core';
import { BaseButton } from '@fundamental-ngx/core/button';
import { Subscription } from 'rxjs';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectableItemToken, SelectComponentRootToken } from '@fundamental-ngx/fn/cdk';
import { coerceBoolean } from '@fundamental-ngx/fn/utils';

export type ButtonType = '' | 'secondary' | 'layout' | 'positive' | 'critical' | 'negative';

/**
 * The Button component is used to activate or deactivate an element.
 * It uses a visual metaphor to inform the user of the state of the button.
 */
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'button[fn-button], a[fn-button]',
    exportAs: 'fn-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class]': `'fn-button ' + class`,
        '[attr.type]': 'type',
        '[class.is-disabled]': 'disabled',
        '[class.fn-button--emphasized]': 'emphasized',
        '[class.fn-button--icon-only]': 'glyph && !label',
        '[attr.aria-disabled]': 'disabled',
        '[disabled]': 'disabled',
        '[value]': 'value'
    },
    providers: [{ provide: SelectableItemToken, useExisting: ButtonComponent }]
})
export class ButtonComponent extends BaseButton implements SelectableItemToken<string>, OnDestroy {
    /** The type of the button. Types include:
     * '' | 'secondary' | 'layout' | 'positive' | 'critical' | 'negative'.
     * Leave empty for default (Standard button).'
     * Default value is set to ''
     */
    @Input()
    fnType: ButtonType = '';

    /**
     * Set emphasized state of the button
     */
    @Input()
    @coerceBoolean
    emphasized: boolean;

    /**
     * Set selected state of the button
     */
    @Input()
    set selected(value: BooleanInput) {
        this.setSelected(coerceBooleanProperty(value));
    }

    /**
     * Native disabled attribute of button element
     */
    @Input()
    get disabled(): boolean {
        return this._disabled || (this.selectComponent !== null && this.selectComponent.disabled);
    }

    set disabled(value: BooleanInput) {
        const newDisabledState = coerceBooleanProperty(value);
        if (this._disabled !== newDisabledState) {
            this._disabled = newDisabledState;
            this._changeDetectorRef.markForCheck();
        }
    }

    /**
     * Value of the button
     */
    @Input()
    value: string;

    /**
     * Additional HTML classes
     */
    @Input()
    class: string;

    /**
     * Fiori Next button type class getter
     */
    @HostBinding('attr.class')
    get fnTypeClass(): string {
        return this.fnType ? `fn-button--${this.fnType}` : '';
    }

    /** @hidden */
    _selected: boolean;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    constructor(
        @Optional() @Inject(SelectComponentRootToken) private selectComponent: SelectComponentRootToken,
        private _elementRef: ElementRef,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        super();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** HasElementRef interface implementation
     * function used by applyCssClass and applyCssStyle decorators
     */
    elementRef(): ElementRef<HTMLButtonElement | HTMLAnchorElement> {
        return this._elementRef;
    }

    setSelected(selected: boolean): void {
        const selectedClass = 'fn-button--selected';
        this._selected = selected;
        const classList = this.elementRef().nativeElement.classList;
        selected ? classList.add(selectedClass) : classList.remove(selectedClass);
        this.elementRef().nativeElement.setAttribute('aria-selected', `${selected}`);
    }

    getSelected(): boolean {
        return this._selected;
    }

    detectChanges(): void {
        this._changeDetectorRef.detectChanges();
    }
}
