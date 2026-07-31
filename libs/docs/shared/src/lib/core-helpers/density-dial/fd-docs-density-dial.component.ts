import { ChangeDetectionStrategy, Component, computed, effect, inject, input, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { GlobalContentDensityService } from '@fundamental-ngx/core/content-density';
import { SegmentedButtonComponent } from '@fundamental-ngx/core/segmented-button';

export type DensityDialChoice = 'global' | 'cozy' | 'compact';

@Component({
    selector: 'fd-docs-density-dial',
    templateUrl: './fd-docs-density-dial.component.html',
    styleUrl: './fd-docs-density-dial.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormsModule, SegmentedButtonComponent, ButtonComponent],
    host: {
        class: 'fd-docs-density-dial'
    }
})
export class FdDocsDensityDialComponent {
    readonly quiet = input(false);
    readonly choice = model<DensityDialChoice>('global');

    protected readonly resolvedDensity = computed(() => this._globalDensity.currentDensitySignal());

    protected readonly echoLabel = computed(() => {
        const resolved = this.resolvedDensity();
        return `Auto → ${resolved}`;
    });

    protected readonly isPinned = computed(() => this.choice() !== 'global');

    protected readonly provenanceText = computed(() => {
        const choice = this.choice();
        const resolved = this.resolvedDensity();
        if (choice === 'global') {
            return `following the site — ${resolved}`;
        }
        if (choice === resolved) {
            return `this example only — ${choice}`;
        }
        return `site: ${resolved} \xB7 pinned: ${choice}`;
    });

    protected readonly flashValue = signal(false);

    private readonly _globalDensity = inject(GlobalContentDensityService);

    constructor() {
        let prevResolved: string | null = null;
        effect(() => {
            const resolved = this.resolvedDensity();
            if (prevResolved !== null && prevResolved !== resolved && this.choice() === 'global') {
                this.flashValue.set(true);
                setTimeout(() => this.flashValue.set(false), 120);
            }
            prevResolved = resolved;
        });
    }
}
