import { ChangeDetectionStrategy, Component, ElementRef, inject, input, Input, ViewEncapsulation } from '@angular/core';
import { FD_SHELLBAR_COMPONENT } from '../tokens';

/**
 * The component for shellbar branding.
 */
@Component({
    selector: 'fd-shellbar-branding',
    template: ` <div
        class="fd-shellbar__branding"
        [class.fd-shellbar__branding--non-interactive]="!interactiveBranding"
        [attr.aria-label]="ariaLabel()"
        [attr.role]="interactiveBranding ? 'link' : null"
        [attr.tabindex]="interactiveBranding ? '0' : null"
    >
        <ng-content></ng-content>
    </div>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    styles: [
        `
            .fd-shellbar__branding {
                padding-inline: 0;
                gap: 0.25rem !important;

                .fd-shellbar__title {
                    padding-inline: 0.25rem;
                }
            }
        `
    ]
})
export class ShellbarBrandingComponent {
    /** Whether the shellbar branding is interactive. */
    @Input()
    interactiveBranding = false;

    /** Aria-label for the branding element. */
    readonly ariaLabel = input<string | undefined>(undefined);

    /** @hidden */
    private readonly _shellbar = inject(FD_SHELLBAR_COMPONENT);

    /** @hidden */
    constructor(private _elRef: ElementRef) {}

    /** @hidden */
    hideTitleIfNeeded(): void {
        if (this._shellbar._actionsExceedShellbarWidth()) {
            const brandingEl = this._elRef.nativeElement.querySelector('.fd-shellbar__branding');
            if (brandingEl) {
                brandingEl.style.display = 'none';
            }
            this._shellbar._notifyTitleHidden(true);
        }
    }

    /** @hidden */
    showTitle(): void {
        const brandingEl = this._elRef.nativeElement.querySelector('.fd-shellbar__branding');
        if (brandingEl) {
            brandingEl.style.display = '';
        }
        this._shellbar._notifyTitleHidden(false);
    }

    /** @hidden */
    getTitleText(): string {
        const titleEl = this._elRef.nativeElement.querySelector('fd-shellbar-title');
        return titleEl?.textContent?.trim() || '';
    }

    /** @hidden */
    getLogoElement(): HTMLElement | null {
        const logoEl = this._elRef.nativeElement.querySelector('fd-shellbar-logo');
        return logoEl;
    }
}
