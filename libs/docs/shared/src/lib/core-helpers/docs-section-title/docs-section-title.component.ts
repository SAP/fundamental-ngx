import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    ElementRef,
    Inject,
    Input,
    OnInit,
    Optional,
    ViewChild
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { CURRENT_COMPONENT } from '../../tokens/current-component.token';
import { CURRENT_LIB, Libraries } from '../../utilities/libraries';

@Component({
    selector: 'fd-docs-section-title',
    template: `
        <h2 [id]="id" #title class="fd-docs-header-link" (click)="navigateToFragment($event)">
            <span class="fd-docs-header-link__text">
                <ng-content></ng-content>
            </span>
            <a
                class="fd-docs-markdown-a"
                [attr.aria-describedby]="id"
                [href]="fragmentUrl"
                (click)="navigateToFragment($event)"
            >
                <fd-icon glyph="number-sign"></fd-icon>
            </a>
        </h2>
    `,
    styleUrls: ['./docs-section-title.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [IconComponent]
})
export class DocsSectionTitleComponent implements OnInit, AfterViewInit {
    @ViewChild('title', { read: ElementRef })
    sectionTitle: ElementRef;

    @Input()
    id = '';

    @Input()
    componentName = '';

    readonly currentLibrary: Libraries;

    /** Pre-computed fragment URL for the anchor href (hash-based routing). */
    get fragmentUrl(): string {
        return `#/${this.currentLibrary}/${this._routeSlug}#${this.id}`;
    }

    private idFromUrl: any;

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router,
        @Inject(CURRENT_LIB) private readonly currentLib: Libraries,
        @Optional() @Inject(CURRENT_COMPONENT) private readonly currentComponent: string | null,
        private readonly _destroyRef: DestroyRef
    ) {
        this.currentLibrary = this.currentLib;
    }

    /** Derive the route slug from CURRENT_COMPONENT token, falling back to the current URL path. */
    private get _routeSlug(): string {
        if (this.currentComponent) {
            return this.currentComponent;
        }
        // Fallback: extract the component slug from the current URL.
        // URL format: /<library>/<component-slug> (possibly with fragment/query)
        const url = this.router.url.split('#')[0].split('?')[0];
        const libPrefix = '/' + this.currentLibrary + '/';
        const idx = url.indexOf(libPrefix);
        if (idx !== -1) {
            return url.substring(idx + libPrefix.length).split('/')[0];
        }
        return this.componentName;
    }

    ngOnInit(): void {
        this.activatedRoute.fragment.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((fragment) => {
            this.idFromUrl = fragment;
            this.handleUrlFragment();
        });
    }

    ngAfterViewInit(): void {
        this.handleUrlFragment();
    }

    /** Navigate to this section's fragment when the heading is clicked. */
    navigateToFragment(event: MouseEvent): void {
        event.preventDefault();
        this.router.navigate(['/' + this.currentLibrary + '/' + this._routeSlug], {
            fragment: this.id,
            replaceUrl: true
        });
    }

    private handleUrlFragment(): void {
        if (this.sectionTitle) {
            if (this.id === this.idFromUrl) {
                this.sectionTitle.nativeElement.scrollIntoView(true);
                this.addOffset();
            }
        }
    }

    private addOffset(): void {
        const pageContent = document.getElementById('page-content');
        if (pageContent) {
            pageContent.scrollTop -= 30;
        }
    }
}
