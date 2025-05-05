import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostListener,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { CssClassBuilder, HasElementRef, applyCssClass } from '@fundamental-ngx/cdk/utils';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { Subscription } from 'rxjs';
import { BaseButton } from './base-button';

import { IconComponent } from '@fundamental-ngx/core/icon';
import { FD_BUTTON_COMPONENT } from './tokens';

/**
 * Button directive, used to enhance standard HTML buttons.
 *
 * ``` selector: button[fd-button], a[fd-button] ```
 *
 * ```html
 * <button fd-button label="Button Text"></button>
 * <a fd-button label="Button Text"></a>
 * ```
 */
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'button[fd-button], a[fd-button], span[fd-button]',
    exportAs: 'fd-button',
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[attr.type]': 'type',
        '[attr.disabled]': 'disabled || null',
        '[attr.aria-label]': 'buttonArialabel',
        '[attr.aria-description]': 'buttonAriaDescription'
    },
    providers: [
        contentDensityObserverProviders(),
        {
            provide: FD_BUTTON_COMPONENT,
            useExisting: ButtonComponent
        }
    ],
    imports: [IconComponent]
})
export class ButtonComponent
    extends BaseButton
    implements OnChanges, CssClassBuilder, OnInit, OnDestroy, HasElementRef
{
    /** The property allows user to pass additional css classes. */
    @Input()
    class = '';

    /** @hidden */
    specialButtonType: Array<string> = ['emphasized', 'positive', 'negative', 'attention'];

    /**
     * Calculate aria-label attribute
     * @hidden
     */
    get buttonArialabel(): string | null {
        if (this.ariaLabel) {
            return this.ariaLabel; // return the input aria-label
        }

        const attrAriaLabel = this.elementRef.nativeElement.getAttribute('aria-label');
        if (attrAriaLabel) {
            return attrAriaLabel; // return the attribute aria-label
        }

        if (this.specialButtonType.includes(this.fdType)) {
            return this.label ?? this.glyph?.replace(/-/g, ' ') ?? null;
        }

        return null;
    }

    /**
     * Calculate aria-description attribute
     * @hidden
     */
    get buttonAriaDescription(): string | null {
        if (this.ariaDescription) {
            return this.ariaDescription;
        }

        if (this.specialButtonType.includes(this.fdType)) {
            return this.fdType;
        }

        return null;
    }

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    constructor(
        public readonly elementRef: ElementRef,
        _contentDensityObserver: ContentDensityObserver
    ) {
        super();
        _contentDensityObserver.subscribe();
    }

    /** Forces the focus outline around the button, which is not default behavior in Safari. */
    @HostListener('click', ['$event'])
    clicked(event: MouseEvent): void {
        const target = event?.target as HTMLElement;
        // Target can be empty during unit tests execution.
        if (target && document.activeElement !== target) {
            target.focus();
        }
    }

    /** @hidden
     * CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [
            'fd-button',
            this.fdType ? `fd-button--${this.fdType}` : '',
            this.fdMenu ? 'fd-button--menu' : '',
            this.disabled || this.ariaDisabled ? 'is-disabled' : '',
            this.toggled ? `fd-button--toggled` : '',
            this.class
        ];
    }

    /** Function runs when component is initialized
     * function should build component css class
     * function should build css style
     */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }
}
