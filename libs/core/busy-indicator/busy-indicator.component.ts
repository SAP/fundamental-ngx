import { TAB } from '@angular/cdk/keycodes';

import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnDestroy,
    ViewEncapsulation,
    booleanAttribute,
    computed,
    effect,
    inject,
    input,
    viewChild
} from '@angular/core';
import { KeyUtil } from '@fundamental-ngx/cdk/utils';
import { FD_LANGUAGE_SIGNAL, TranslationResolver } from '@fundamental-ngx/i18n';
import { FD_BUSY_INDICATOR_COMPONENT } from './tokens';

export type BusyIndicatorSize = 's' | 'm' | 'l';

@Component({
    selector: 'fd-busy-indicator',
    templateUrl: './busy-indicator.component.html',
    styleUrl: './busy-indicator.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    providers: [
        {
            provide: FD_BUSY_INDICATOR_COMPONENT,
            useExisting: BusyIndicatorComponent
        }
    ],
    host: {
        '[attr.role]': "loading() ? 'progressbar' : 'presentation'",
        '[attr.tabindex]': 'loading() ? 0 : -1',
        '[attr.aria-busy]': 'loading()',
        '[attr.aria-live]': 'ariaLive()',
        '[attr.aria-label]': 'ariaLabel()',
        '[attr.aria-valuetext]': 'loading() ? ariaValueText() || _ariaValueText() : null',
        '[attr.aria-valuemin]': '0',
        '[attr.aria-valuemax]': '100',
        '[attr.title]': 'loading() ? title() || _titleValue() : null',
        '[class.fd-busy-indicator__container]': 'true',
        '[class.fd-busy-indicator__container--inline]': '!block()',
        '(keydown)': 'hostFocusChangeHandler($event)'
    }
})
export class BusyIndicatorComponent implements OnDestroy {
    /** Whether to display the loading indicator animation. */
    readonly loading = input(false);

    /** The size of the loading indicator, default will be medium */
    readonly size = input<BusyIndicatorSize>('m');

    /** Whether to use loader as block element */
    readonly block = input(false);

    /** Aria label attribute value. */
    readonly ariaLabel = input<string | null>(null);

    /** Aria-valuetext attribute value. */
    readonly ariaValueText = input<string | null>(null);

    /** title attribute value for tooltip. */
    readonly title = input<string | undefined>(undefined);

    /** add loading label value */
    readonly label = input<string | undefined>(undefined);

    /** Aria live attribute value. */
    readonly ariaLive = input<'assertive' | 'polite' | 'off' | null>(null);

    /** Whether to stop mouse wheel events when the busy indicator is displayed via loading="true". */
    preventWheelEvents = input(false, { transform: booleanAttribute });

    /** @hidden */
    protected readonly fakeFocusElement = viewChild<ElementRef>('fakeFocusElement');

    /** @hidden */
    protected readonly _langSignal = inject(FD_LANGUAGE_SIGNAL);

    /** @hidden */
    protected readonly _translationResolver = inject(TranslationResolver);

    /** @hidden */
    protected readonly _ariaValueText = computed(() =>
        this._translationResolver.resolve(this._langSignal(), 'coreBusyIndicator.defaultAriaValueText')
    );

    /** @hidden */
    protected readonly _titleValue = computed(() =>
        this._translationResolver.resolve(this._langSignal(), 'coreBusyIndicator.defaultTitle')
    );

    /** @hidden */
    private readonly _elementRef = inject(ElementRef);

    constructor() {
        // Reactively manage wheel event listener based on preventWheelEvents signal
        effect((onCleanup) => {
            if (this.preventWheelEvents()) {
                this._elementRef.nativeElement.addEventListener('wheel', this._wheelListener, {
                    passive: false
                });

                onCleanup(() => {
                    this._elementRef.nativeElement.removeEventListener('wheel', this._wheelListener, {
                        passive: false
                    });
                });
            }
        });
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._elementRef.nativeElement.removeEventListener('wheel', this._wheelListener, {
            passive: false
        });
    }

    /** @hidden If focus escapes busy container focus element after wrapped content */
    protected hostFocusChangeHandler(event: KeyboardEvent): void {
        if (this.loading() && KeyUtil.isKeyCode(event, TAB) && !event.shiftKey) {
            const element = this.fakeFocusElement();
            if (element) {
                element.nativeElement.focus();
            }
        }
    }

    /** @hidden If busy container is navigated as "previous focusable element",
     * focus busy indicator to prevent from focusing wrapped content */
    protected fakeElementFocusHandler(event: FocusEvent): void {
        if (this.loading() && event.relatedTarget !== this._elementRef.nativeElement) {
            event.stopPropagation();
            this._elementRef.nativeElement.focus();
        }
    }

    /** @hidden */
    private _wheelListener = (event: WheelEvent): void => {
        if (this.preventWheelEvents() && this.loading()) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
    };
}
