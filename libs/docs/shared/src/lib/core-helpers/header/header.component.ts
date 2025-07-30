import { ChangeDetectionStrategy, Component, Input, signal, WritableSignal } from '@angular/core';
import { MessageStripComponent } from '@fundamental-ngx/core/message-strip';

@Component({
    selector: 'header',
    imports: [MessageStripComponent],
    template: `
        <h1 class="header">
            <ng-content></ng-content>
        </h1>
        <!-- @if (isDeprecated()) {
            <fd-message-strip type="warning" [dismissible]="false">
                The component has been deprecated since version 0.57 (August 2025) and enters Long-Term Support (LTS)
                until end of 2027, with critical fixes, UX enhancements and accessibility improvements. Deleting is
                planned after LTS. For new projects or additional features, migration to
                <a class="fd-link" href="https://ui5-webcomponents-ngx.netlify.app/">UI5 Web Components for Angular</a>
                is recommended.
            </fd-message-strip>
        } -->
    `,
    styles: [
        `
            .header {
                color: var(--sapPageHeader_TextColor);
                margin-top: 2rem;
                font-size: 2.2rem;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class HeaderComponent {
    @Input() isDeprecated: WritableSignal<boolean> = signal(true);
}
