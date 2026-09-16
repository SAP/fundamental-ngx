import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { IconComponent } from '@fundamental-ngx/core/icon';

@Component({
    selector: 'app-root',
    imports: [IconComponent, RouterLink, RouterOutlet],
    template: `
        <main class="icon-baseline-page" data-testid="baseline-icons">
            <h1>Fundamental NGX Icon CSS Baseline</h1>
            <a class="icon-baseline-link" routerLink="/lazy">Lazy icon route</a>

            <section class="icon-baseline-grid" aria-label="Icon samples">
                <article class="icon-baseline-sample">
                    <fd-icon glyph="accept" ariaLabel="SAP icons accept" data-testid="fd-sap-icon"></fd-icon>
                    <span class="icon-baseline-label">IconComponent SAP-icons</span>
                </article>

                <article class="icon-baseline-sample">
                    <fd-icon
                        glyph="exceptions"
                        font="SAP-icons-TNT"
                        ariaLabel="SAP icons TNT exceptions"
                        data-testid="fd-tnt-icon"
                    ></fd-icon>
                    <span class="icon-baseline-label">IconComponent SAP-icons-TNT</span>
                </article>

                <article class="icon-baseline-sample">
                    <fd-icon
                        glyph="3D"
                        font="BusinessSuiteInAppSymbols"
                        ariaLabel="Business Suite 3D"
                        data-testid="fd-business-suite-icon"
                    ></fd-icon>
                    <span class="icon-baseline-label">IconComponent BusinessSuiteInAppSymbols</span>
                </article>

                <article class="icon-baseline-sample">
                    <span
                        class="sap-icon sap-icon--accept"
                        aria-label="Raw SAP icon class"
                        role="img"
                        data-testid="raw-sap-icon"
                    ></span>
                    <span class="icon-baseline-label">Raw sap-icon-* class</span>
                </article>
            </section>

            <router-outlet />
        </main>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
