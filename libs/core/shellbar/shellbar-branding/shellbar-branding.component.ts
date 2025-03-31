import { ChangeDetectionStrategy, Component, ElementRef, inject, Input, ViewEncapsulation } from '@angular/core';
import { FD_SHELLBAR_COMPONENT } from '../tokens';

/**
 * The component for shellbar branding.
 */
@Component({
    selector: 'fd-shellbar-branding',
    template: ` <div
        class="fd-shellbar__branding"
        [class.fd-shellbar__branding--non-interactive]="!interactiveBranding"
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

    /** @hidden */
    private readonly _shellbar = inject(FD_SHELLBAR_COMPONENT);

    /** @hidden */
    constructor(private _elRef: ElementRef) {}

    /** @hidden */
    hideTitleIfNeeded(): void {
        if (this._shellbar._actionsExceedShellbarWidth()) {
            const titleEl = this._elRef.nativeElement.querySelector('fd-shellbar-title');
            if (titleEl) {
                titleEl.style.display = 'none';
            }
        }
    }

    /** @hidden */
    showTitle(): void {
        const titleEl = this._elRef.nativeElement.querySelector('fd-shellbar-title');
        if (titleEl) {
            titleEl.style.display = 'flex';
        }
    }
}
