import { TAB } from '@angular/cdk/keycodes';

import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    ViewEncapsulation,
    computed,
    inject,
    input,
    viewChild
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { KeyUtil } from '@fundamental-ngx/cdk/utils';
import { FD_LANGUAGE, FdLanguage, TranslationResolver } from '@fundamental-ngx/i18n';
import { map } from 'rxjs';
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
        '[attr.aria-valuetext]': 'ariaValueText() || _ariaValueText()',
        '[attr.aria-valuemin]': '0',
        '[attr.aria-valuemax]': '100',
        '[attr.title]': '_titleAttribute()',
        '[class.fd-busy-indicator__container]': 'true',
        '[class.fd-busy-indicator__container--inline]': '!block()',
        '(keydown)': 'hostFocusChangeHandler($event)'
    }
})
export class BusyIndicatorComponent {
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
    readonly title = input<string | null | undefined>(undefined);

    /** add loading label value */
    readonly label = input<string | undefined>(undefined);

    /** Aria live attribute value. */
    readonly ariaLive = input<'assertive' | 'polite' | 'off' | null>(null);

    /** @hidden */
    protected readonly fakeFocusElement = viewChild<ElementRef>('fakeFocusElement');

    /** @hidden */
    protected readonly _lang$ = inject(FD_LANGUAGE);

    /** @hidden */
    protected readonly _translationResolver = inject(TranslationResolver);

    /** @hidden */
    protected readonly _ariaValueText = toSignal(
        this._lang$.pipe(
            map((lang: FdLanguage) => this._translationResolver.resolve(lang, 'coreBusyIndicator.defaultAriaValueText'))
        ),
        { initialValue: 'Busy' }
    );

    /** @hidden */
    protected readonly _titleValue = toSignal(
        this._lang$.pipe(
            map((lang: FdLanguage) => this._translationResolver.resolve(lang, 'coreBusyIndicator.defaultTitle'))
        ),
        { initialValue: 'Please wait' }
    );

    /** @hidden Determines the value for the title attribute, allowing null to remove it. */
    protected readonly _titleAttribute = computed(() => {
        const title = this.title();
        if (title === null) {
            return null;
        }

        if (title === undefined) {
            return this._titleValue();
        }

        return title;
    });

    /** @hidden */
    private readonly _elementRef = inject(ElementRef);

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
}
