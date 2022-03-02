import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostBinding,
    Inject,
    Input,
    Optional,
    ViewEncapsulation
} from '@angular/core';
import { BaseButton } from '@fundamental-ngx/core/button';
import { coerceBoolean } from '@fundamental-ngx/fn/utils';
import {
    DisabledBehavior,
    FN_DISABLED,
    FN_READONLY,
    FnDisabledProvider,
    ReadonlyBehavior
} from '@fundamental-ngx/fn/cdk';
import { merge } from 'rxjs';

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
        '[attr.type]': 'type',
        '[class.fn-button--emphasized]': 'emphasized',
        '[class.fn-button--icon-only]': 'glyph && !label',
        '[attr.aria-label]': 'ariaLabel',
        '[value]': 'value'
    },
    providers: [FnDisabledProvider]
})
export class ButtonComponent extends BaseButton {
    @Input()
    value?: string;

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
     * Additional HTML classes
     */
    @Input()
    class: string;

    /**
     * Fiori Next button type class getter
     */
    @HostBinding('attr.class')
    get fnTypeClass(): string {
        return ['fn-button', this.fnType ? `fn-button--${this.fnType}` : '', this.class].filter((c) => !!c).join(' ');
    }

    @HostBinding('attr.tabindex')
    tabIndex = 0;

    /** @hidden */
    constructor(
        private _elementRef: ElementRef,
        private _changeDetectorRef: ChangeDetectorRef,
        @Inject(FN_DISABLED) private _disabled$: DisabledBehavior,
        @Optional() @Inject(FN_READONLY) private _readonly$: ReadonlyBehavior
    ) {
        super();
        merge(...[_disabled$, _readonly$].filter(Boolean)).subscribe((v) => (this.tabIndex = v ? -1 : 0));
    }

    /** HasElementRef interface implementation
     * function used by applyCssClass and applyCssStyle decorators
     */
    elementRef(): ElementRef<HTMLButtonElement | HTMLAnchorElement> {
        return this._elementRef;
    }

    /** @hidden */
    detectChanges(): void {
        this._changeDetectorRef.detectChanges();
    }
}
