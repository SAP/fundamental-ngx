import { ChangeDetectionStrategy, Component, ElementRef, inject, Input, ViewEncapsulation } from '@angular/core';
import { ShellbarComponent } from '../shellbar.component';

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
    private _shellbar = inject(ShellbarComponent);

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
