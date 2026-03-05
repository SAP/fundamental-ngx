import { Component, computed, inject } from '@angular/core';
import { GlobalContentDensityService } from '@fundamental-ngx/core/content-density';
import { ObjectStatusComponent } from '@fundamental-ngx/core/object-status';

/**
 * Example component demonstrating custom CSS modifier classes.
 * Instead of the default 'is-compact', 'is-cozy', 'is-condensed',
 * this uses project-specific class names like 'density--compact'.
 *
 * The custom classes drive CSS custom properties that visibly change
 * padding, font-size, gap, and avatar size.
 */
@Component({
    selector: 'fd-docs-custom-modifiers-example',
    template: `
        <div class="custom-mod" [class]="densityClass()">
            <div class="custom-mod__header">
                <span>Current density: </span>
                <span fd-object-status [inverted]="true" [label]="density()"></span>
                <code class="custom-mod__class">{{ densityClass() }}</code>
            </div>

            <!-- Card-like items that react to density via custom CSS props -->
            <div class="custom-mod__cards">
                <div class="custom-mod__card">
                    <div class="custom-mod__avatar">AJ</div>
                    <div>
                        <div class="custom-mod__name">Alice Johnson</div>
                        <div class="custom-mod__role">Senior Engineer</div>
                    </div>
                </div>
                <div class="custom-mod__card">
                    <div class="custom-mod__avatar">BS</div>
                    <div>
                        <div class="custom-mod__name">Bob Smith</div>
                        <div class="custom-mod__role">UX Designer</div>
                    </div>
                </div>
                <div class="custom-mod__card">
                    <div class="custom-mod__avatar">CL</div>
                    <div>
                        <div class="custom-mod__name">Carol Lee</div>
                        <div class="custom-mod__role">Product Manager</div>
                    </div>
                </div>
            </div>

            <p class="custom-mod__hint">
                These cards use custom CSS classes (<code>density--cozy</code>, <code>density--compact</code>,
                <code>density--condensed</code>) to drive CSS custom properties that control padding, font-size, gap,
                and avatar size.
            </p>
        </div>
    `,
    styles: [
        `
            /* --- Custom density classes set CSS custom properties --- */
            .density--cozy {
                --card-padding: 0.75rem;
                --card-gap: 0.75rem;
                --cards-gap: 0.75rem;
                --card-font-size: 0.9375rem;
                --card-sub-font-size: 0.8125rem;
                --avatar-size: 2.5rem;
                --avatar-font-size: 0.875rem;
            }
            .density--compact {
                --card-padding: 0.5rem;
                --card-gap: 0.5rem;
                --cards-gap: 0.5rem;
                --card-font-size: 0.8125rem;
                --card-sub-font-size: 0.75rem;
                --avatar-size: 2rem;
                --avatar-font-size: 0.75rem;
            }
            .density--condensed {
                --card-padding: 0.25rem 0.5rem;
                --card-gap: 0.375rem;
                --cards-gap: 0.25rem;
                --card-font-size: 0.75rem;
                --card-sub-font-size: 0.6875rem;
                --avatar-size: 1.5rem;
                --avatar-font-size: 0.625rem;
            }

            /* --- Component styles using the custom properties --- */
            .custom-mod {
                padding: 1rem;
                border: 1px dashed var(--sapNeutralBorderColor);
                border-radius: 4px;
            }
            .custom-mod__header {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin-bottom: 0.75rem;
            }
            .custom-mod__class {
                margin-left: auto;
                background: var(--sapBackgroundColor);
                padding: 0.125rem 0.375rem;
                border-radius: 2px;
                font-size: 0.75rem;
                color: var(--sapNeutralTextColor);
            }
            .custom-mod__cards {
                display: flex;
                flex-wrap: wrap;
                gap: var(--cards-gap, 0.75rem);
            }
            .custom-mod__card {
                display: flex;
                align-items: center;
                gap: var(--card-gap, 0.75rem);
                padding: var(--card-padding, 0.75rem);
                border: 1px solid var(--sapNeutralBorderColor);
                border-radius: 4px;
                background: var(--sapTile_Background);
                transition:
                    padding 0.15s,
                    gap 0.15s;
            }
            .custom-mod__avatar {
                width: var(--avatar-size, 2.5rem);
                height: var(--avatar-size, 2.5rem);
                min-width: var(--avatar-size, 2.5rem);
                border-radius: 50%;
                background: var(--sapAccentColor6);
                color: var(--sapContent_ContrastTextColor, #fff);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: var(--avatar-font-size, 0.875rem);
                font-weight: 600;
                transition:
                    width 0.15s,
                    height 0.15s,
                    min-width 0.15s,
                    font-size 0.15s;
            }
            .custom-mod__name {
                font-size: var(--card-font-size, 0.9375rem);
                font-weight: 600;
                color: var(--sapTextColor);
                transition: font-size 0.15s;
            }
            .custom-mod__role {
                font-size: var(--card-sub-font-size, 0.8125rem);
                color: var(--sapContent_LabelColor);
                transition: font-size 0.15s;
            }
            .custom-mod__hint {
                margin-top: 0.75rem;
                margin-bottom: 0;
                font-size: 0.8125rem;
                color: var(--sapNeutralTextColor);
            }
            .custom-mod__hint code {
                background: var(--sapBackgroundColor);
                padding: 0.125rem 0.25rem;
                border-radius: 2px;
            }
        `
    ],
    imports: [ObjectStatusComponent]
})
export class CustomModifiersExampleComponent {
    protected readonly density;
    protected readonly densityClass;

    constructor() {
        const densityService = inject(GlobalContentDensityService);
        this.density = densityService.currentDensitySignal;
        this.densityClass = computed(() => `custom-mod density--${this.density()}`);
    }
}
