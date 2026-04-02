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
                position: relative;
                color: var(--sapTitleColor, var(--sapTextColor));
                font-family: var(--sapFontFamily);
                font-size: var(--sapFontHeader1Size, 2.25rem);
                font-weight: 700;
                line-height: 1.2;
                margin-block-start: 1.5rem;
                margin-block-end: 0.5rem;
                padding-inline-start: 1rem;
            }

            .header::before {
                content: '';
                position: absolute;
                inset-inline-start: 0;
                inset-block-start: 0.25rem;
                inset-block-end: 0.25rem;
                width: 0.25rem;
                border-radius: 0.125rem;
                background: var(--sapBrandColor);
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
    @Input() isDeprecated: WritableSignal<boolean> = signal(true);
}
