import {
    afterNextRender,
    ChangeDetectionStrategy,
    Component,
    computed,
    DestroyRef,
    inject,
    input,
    signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

interface TocSection {
    id: string;
    text: string;
    index: string;
}

/** Offset in px to clear the sticky toolbar when scrolling to a section */
const SCROLL_OFFSET = 60;

@Component({
    selector: 'fd-docs-table-of-contents',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fd-docs-toc',
        '[class.fd-docs-toc--hidden]': '!visible()'
    },
    template: `
        <nav class="fd-docs-toc__nav" aria-label="On this page">
            <span class="fd-docs-toc__heading">On This Page</span>
            <ul class="fd-docs-toc__list">
                @for (section of sections(); track section.id) {
                    <li>
                        <a
                            class="fd-docs-toc__link"
                            [class.fd-docs-toc__link--active]="activeId() === section.id"
                            [href]="'#' + section.id"
                            (click)="scrollToSection(section.id); $event.preventDefault()"
                        >
                            <span class="fd-docs-toc__number">{{ section.index }}</span>
                            {{ section.text }}
                        </a>
                    </li>
                }
            </ul>
        </nav>
    `,
    styles: `
        :host {
            position: sticky;
            inset-block-start: 1rem;
            align-self: flex-start;
            flex-shrink: 0;
            width: 14rem;
            max-height: calc(100vh - 5rem);
            overflow-y: auto;
            padding-block: 1rem;
            padding-inline-start: 0.5rem;
            box-sizing: border-box;
        }

        :host(.fd-docs-toc--hidden) {
            display: none;
        }

        .fd-docs-toc__heading {
            display: block;
            font-family: var(--sapFontFamily);
            font-size: var(--sapFontSmallSize, 0.75rem);
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            color: var(--sapContent_LabelColor);
            padding-inline: 0.75rem;
            margin-block-end: 0.5rem;
        }

        .fd-docs-toc__list {
            list-style: none;
            margin: 0;
            padding: 0;
        }

        .fd-docs-toc__link {
            display: flex;
            align-items: baseline;
            gap: 0.5rem;
            padding-block: 0.3rem;
            padding-inline: 0.75rem;
            font-family: var(--sapFontFamily);
            font-size: var(--sapFontSize, 0.875rem);
            color: var(--sapContent_LabelColor);
            text-decoration: none;
            line-height: 1.4;
            border-inline-start: 0.125rem solid transparent;
            transition:
                color 200ms ease,
                border-color 200ms ease;
            cursor: pointer;
        }

        .fd-docs-toc__link:hover {
            color: var(--sapBrandColor);
        }

        .fd-docs-toc__link:hover .fd-docs-toc__number {
            color: var(--sapBrandColor);
        }

        .fd-docs-toc__link:focus-visible {
            outline: var(--sapContent_FocusWidth, 0.0625rem) var(--sapContent_FocusStyle, dotted)
                var(--sapContent_FocusColor);
            outline-offset: 0.0625rem;
        }

        .fd-docs-toc__link--active {
            color: var(--sapBrandColor);
            font-weight: 600;
            border-inline-start-color: var(--sapBrandColor);
        }

        .fd-docs-toc__link--active .fd-docs-toc__number {
            color: var(--sapBrandColor);
        }

        .fd-docs-toc__number {
            flex-shrink: 0;
            font-size: var(--sapFontSmallSize, 0.75rem);
            font-weight: 600;
            color: var(--sapContent_NonInteractiveIconColor);
            font-variant-numeric: tabular-nums;
            transition: color 200ms ease;
        }
    `
})
export class TableOfContentsComponent {
    readonly scrollContainer = input.required<HTMLElement>();

    protected readonly sections = signal<TocSection[]>([]);
    protected readonly activeId = signal<string>('');
    protected readonly visible = computed(() => this.sections().length >= 2 && this._isWideScreen());

    private readonly _router = inject(Router);
    private readonly _route = inject(ActivatedRoute);
    private readonly _destroyRef = inject(DestroyRef);
    private readonly _isWideScreen = signal(true);
    private _intersectionObserver: IntersectionObserver | null = null;
    private _mutationObserver: MutationObserver | null = null;
    private _resizeObserver: ResizeObserver | null = null;
    private _scanTimeout: ReturnType<typeof setTimeout> | null = null;
    private _lastRoutePath = '';

    constructor() {
        this._router.events
            .pipe(
                filter((e): e is NavigationEnd => e instanceof NavigationEnd),
                takeUntilDestroyed()
            )
            .subscribe((e) => {
                // Extract the path portion (before any fragment) to detect actual page changes.
                // Only clear sections when navigating to a different page, not on fragment-only changes.
                const path = e.urlAfterRedirects.split('#')[0];
                if (this._lastRoutePath && path !== this._lastRoutePath) {
                    this.sections.set([]);
                }
                this._lastRoutePath = path;
            });

        afterNextRender(() => {
            this._setupMutationObserver();
            this._setupResizeObserver();
            this._scanSections();
        });

        this._destroyRef.onDestroy(() => {
            this._intersectionObserver?.disconnect();
            this._mutationObserver?.disconnect();
            this._resizeObserver?.disconnect();
            if (this._scanTimeout) {
                clearTimeout(this._scanTimeout);
            }
        });
    }

    protected scrollToSection(id: string): void {
        const container = this.scrollContainer();
        if (!container) {
            return;
        }

        const target = container.querySelector(`#${CSS.escape(id)}`);
        if (!target) {
            return;
        }

        const containerRect = container.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const offset = targetRect.top - containerRect.top + container.scrollTop;

        container.scrollTo({
            top: offset - SCROLL_OFFSET,
            behavior: 'smooth'
        });

        this.activeId.set(id);

        // Update the URL fragment without triggering a full navigation
        this._router.navigate([], {
            relativeTo: this._route,
            fragment: id,
            replaceUrl: true
        });
    }

    private _scanSections(): void {
        const container = this.scrollContainer();
        if (!container) {
            return;
        }

        const headings = container.querySelectorAll('fd-docs-section-title h2[id]');
        const entries: TocSection[] = [];

        headings.forEach((h2, i) => {
            const id = h2.getAttribute('id');
            const text = h2.textContent?.trim() || '';
            if (id && text) {
                entries.push({ id, text, index: String(i + 1).padStart(2, '0') });
            }
        });

        this.sections.set(entries);
        this._setupIntersectionObserver();
    }

    private _debouncedScan(): void {
        if (this._scanTimeout) {
            clearTimeout(this._scanTimeout);
        }
        this._scanTimeout = setTimeout(() => this._scanSections(), 50);
    }

    /** Watch for fd-docs-section-title elements being added/removed */
    private _setupMutationObserver(): void {
        const container = this.scrollContainer();
        if (!container) {
            return;
        }

        this._mutationObserver = new MutationObserver((mutations) => {
            const relevant = mutations.some((m) =>
                Array.from(m.addedNodes)
                    .concat(Array.from(m.removedNodes))
                    .some(
                        (n) =>
                            n instanceof HTMLElement &&
                            (n.matches('fd-docs-section-title') || n.querySelector('fd-docs-section-title'))
                    )
            );
            if (relevant) {
                this._debouncedScan();
            }
        });

        this._mutationObserver.observe(container, {
            childList: true,
            subtree: true
        });
    }

    private _setupIntersectionObserver(): void {
        this._intersectionObserver?.disconnect();

        const container = this.scrollContainer();
        if (!container || this.sections().length === 0) {
            return;
        }

        this._intersectionObserver = new IntersectionObserver(
            (entries) => {
                // Pick the intersecting heading closest to the top of the viewport
                let closest: IntersectionObserverEntry | null = null;
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        if (!closest || entry.boundingClientRect.top < closest.boundingClientRect.top) {
                            closest = entry;
                        }
                    }
                }
                if (closest) {
                    this.activeId.set(closest.target.id);
                }
            },
            {
                root: container,
                // -52px clears the sticky toolbar (3.25rem); -70% limits detection to the top 30%
                rootMargin: '-52px 0px -70% 0px',
                threshold: 0
            }
        );

        const headings = container.querySelectorAll('fd-docs-section-title h2[id]');
        headings.forEach((h2) => this._intersectionObserver!.observe(h2));
    }

    private _setupResizeObserver(): void {
        this._checkWidth();

        const container = this.scrollContainer();
        if (!container) {
            return;
        }

        this._resizeObserver = new ResizeObserver(() => {
            this._checkWidth();
        });
        this._resizeObserver.observe(container);
    }

    /** Show ToC only when the scroll container is wide enough (>= 56rem / 896px) */
    private _checkWidth(): void {
        const container = this.scrollContainer();
        this._isWideScreen.set(container ? container.clientWidth >= 896 : false);
    }
}
