import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '@fundamental-ngx/core/icon';

@Component({
    selector: 'app-lazy-icons',
    imports: [IconComponent],
    template: `
        <section class="icon-baseline-grid" aria-label="Lazy icon sample" data-testid="lazy-icons">
            <article class="icon-baseline-sample">
                <fd-icon glyph="search" ariaLabel="Lazy SAP icon" data-testid="lazy-sap-icon"></fd-icon>
                <span class="icon-baseline-label">Lazy IconComponent SAP-icons</span>
            </article>
        </section>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LazyIconsComponent {}
