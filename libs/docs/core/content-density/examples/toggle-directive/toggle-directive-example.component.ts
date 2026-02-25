import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';
import {
    ContentDensityDirective,
    GlobalContentDensityService,
    provideContentDensity
} from '@fundamental-ngx/core/content-density';
import { ContentDensityUserComponent } from '../content-density-user/content-density-user.component';

/**
 * Example demonstrating directive toggle behavior.
 * When fdCompact/fdCozy/fdCondensed is set to false, the directive
 * reverts to the 'global' keyword, following the global service value.
 */
@Component({
    selector: 'fd-toggle-directive-example',
    template: `
        <div class="toggle-example">
            <div class="toggle-example__controls">
                <fd-checkbox [(ngModel)]="useCompact" label="Use fdCompact directive"></fd-checkbox>
            </div>

            <div class="toggle-example__demo">
                <fd-docs-content-density-user [fdCompact]="useCompact">
                    @if (useCompact) {
                        <span>fdCompact = true → Forces compact density</span>
                    } @else {
                        <span>fdCompact = false → Follows global density</span>
                    }
                </fd-docs-content-density-user>
            </div>

            <p class="toggle-example__hint">
                Toggle the checkbox to see how <code>[fdCompact]="false"</code> reverts to global density.
            </p>
        </div>
    `,
    styles: [
        `
            .toggle-example {
                padding: 1rem;
                border: 1px dashed var(--sapNeutralBorderColor);
                border-radius: 4px;
            }
            .toggle-example__controls {
                margin-bottom: 1rem;
            }
            .toggle-example__demo {
                margin-bottom: 1rem;
            }
            .toggle-example__hint {
                font-size: 0.875rem;
                color: var(--sapNeutralTextColor);
            }
            .toggle-example__hint code {
                background: var(--sapBackgroundColor);
                padding: 0.125rem 0.25rem;
                border-radius: 2px;
            }
        `
    ],
    imports: [FormsModule, ContentDensityDirective, ContentDensityUserComponent, CheckboxComponent],
    providers: [GlobalContentDensityService, provideContentDensity()]
})
export class ToggleDirectiveExampleComponent {
    useCompact = true;
}
