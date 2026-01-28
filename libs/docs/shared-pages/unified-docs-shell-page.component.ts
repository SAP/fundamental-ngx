import { CdkScrollable } from '@angular/cdk/overlay';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import {
    DocsNavigationService,
    DocumentationBaseComponent,
    SectionInterface,
    SectionsToolbarComponent,
    ToolbarDocsComponent
} from '@fundamental-ngx/docs/shared';
import { filter, map, startWith } from 'rxjs';

/**
 * Unified documentation shell page component.
 * This component displays all packages in a single side navigation,
 * allowing users to browse documentation across all packages without switching.
 */
@Component({
    selector: 'fd-unified-docs-shell',
    templateUrl: './unified-docs-shell-page.component.html',
    imports: [DocumentationBaseComponent, ToolbarDocsComponent, SectionsToolbarComponent, RouterOutlet, CdkScrollable]
})
export class UnifiedDocsShellPageComponent {
    /** Unified sections from all registered packages */
    readonly sections: ReturnType<typeof computed<SectionInterface[]>>;

    /** Current active package ID derived from URL */
    protected readonly activePackageId: ReturnType<typeof computed<string>>;

    private readonly _docsNavigation = inject(DocsNavigationService);
    private readonly _router = inject(Router);

    /** Track the current active package based on URL */
    private readonly _currentUrl = toSignal(
        this._router.events.pipe(
            filter((event) => event instanceof NavigationEnd),
            map((event) => (event as NavigationEnd).urlAfterRedirects),
            startWith(this._router.url)
        ),
        { initialValue: this._router.url }
    );

    constructor() {
        this.sections = computed<SectionInterface[]>(() => this._docsNavigation.unifiedSections());
        this.activePackageId = computed(() => {
            const url = this._currentUrl();
            // Extract package ID from URL (e.g., '/core/button' -> 'core')
            const match = url.match(/^\/([^/]+)/);
            return match ? match[1] : 'core';
        });
    }
}
