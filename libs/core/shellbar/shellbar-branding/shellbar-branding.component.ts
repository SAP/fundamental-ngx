import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

/**
 * The component for shellbar branding.
 */
@Component({
    selector: 'fd-shellbar-branding',
    template: `
    <div class="fd-shellbar__branding" [class.fd-shellbar__branding--non-interactive]="!interactiveBranding">
        <ng-content></ng-content>
    </div>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class ShellbarBrandingComponent {
    /** Whether the shellbar branding is interactive. */
    @Input()
    interactiveBranding = false;
}
