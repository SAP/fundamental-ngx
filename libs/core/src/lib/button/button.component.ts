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
    Optional,
    ViewEncapsulation
} from '@angular/core';
import { BaseButton } from './base-button';
import { Subscription } from 'rxjs';
import { ContentDensityService } from '@fundamental-ngx/core/utils';
import { CssClassBuilder } from '@fundamental-ngx/core/utils';
import { applyCssClass } from '@fundamental-ngx/core/utils';

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
    }
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
    get buttonArialabel(): string {
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
        @Optional() private _contentDensityService: ContentDensityService
    ) {
        super();
    }

    /** Function runs when component is initialized
     * function should build component css class
     * function should build css style
     */
    public ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    public ngOnInit(): void {
        if (this.compact === undefined && this._contentDensityService) {
            this._subscriptions.add(
                this._contentDensityService._contentDensityListener.subscribe((density) => {
                    this.compact = density !== 'cozy';
                    this.buildComponentCssClass();
                })
            );
        }
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string[] {
        return [
            'fd-button',
            this.fdType ? `fd-button--${this.fdType}` : '',
            this.compact ? 'fd-button--compact' : '',
            this.fdMenu ? 'fd-button--menu' : '',
            this._disabled || this._ariaDisabled ? 'is-disabled' : '',
            this.class
        ];
    }

    /** HasElementRef interface implementation
     * function used by applyCssClass and applyCssStyle decorators
     */
    public elementRef(): ElementRef<HTMLButtonElement | HTMLAnchorElement> {
        return this._elementRef;
    }

    detectChanges(): void {
        this._changeDetectorRef.detectChanges();
    }
}
