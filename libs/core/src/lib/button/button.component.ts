import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostListener,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { BaseButton } from './base-button';
import { Subscription } from 'rxjs';
import { applyCssClass, CssClassBuilder } from '@fundamental-ngx/cdk/utils';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';

import { FD_BUTTON_COMPONENT } from './tokens';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { NgIf, NgTemplateOutlet } from '@angular/common';

/**
 * Button component, used to enhance standard HTML buttons.
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
    selector: 'button[fd-button], a[fd-button]',
    exportAs: 'fd-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[attr.type]': 'type',
        '[attr.disabled]': '_disabled || null',
        '[attr.aria-label]': 'buttonArialabel'
    },
    providers: [
        contentDensityObserverProviders(),
        {
            provide: FD_BUTTON_COMPONENT,
            useExisting: ButtonComponent
        }
    ],
    standalone: true,
    imports: [NgIf, NgTemplateOutlet, IconComponent]
})
export class ButtonComponent extends BaseButton implements OnChanges, CssClassBuilder, OnInit, OnDestroy {
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
            return this.ariaLabel;
        }

        if (this.specialButtonType.includes(this.fdType)) {
            if (this.label != null) {
                return this.label + ', ' + this.fdType;
            }

            if (this.glyph != null) {
                return this.fdType + ', ' + this.glyph.split('-').join(' ');
            }
        }

        return null;
    }

    /** @hidden */
    private _subscriptions = new Subscription();

    /** Forces the focus outline around the button, which is not default behavior in Safari. */
    @HostListener('click', ['$event'])
    clicked(event: MouseEvent): void {
        const target = event?.target as HTMLElement;
        // Target can be empty during unit tests execution.
        if (target && document.activeElement !== target) {
            target.focus();
        }
    }

    /** @hidden */
    constructor(
        private _elementRef: ElementRef,
        private _changeDetectorRef: ChangeDetectorRef,
        private _contentDensityObserver: ContentDensityObserver
    ) {
        super();
        _contentDensityObserver.subscribe();
    }

    /** Function runs when component is initialized
     * function should build component css class
     * function should build css style
     */
    public ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    public ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
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
            this._disabled || this._ariaDisabled ? 'is-disabled' : '',
            this.toggled ? `fd-button--toggled` : '',
            this.class
        ];
    }

    /** HasElementRef interface implementation
     * function used by applyCssClass and applyCssStyle decorators
     */
    public elementRef(): ElementRef<HTMLButtonElement | HTMLAnchorElement> {
        return this._elementRef;
    }

    /** @hidden */
    detectChanges(): void {
        this._changeDetectorRef.detectChanges();
    }
}
