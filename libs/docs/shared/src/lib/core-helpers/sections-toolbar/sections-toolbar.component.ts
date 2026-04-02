import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    ElementRef,
    inject,
    input,
    model,
    signal,
    viewChild
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { filter, map } from 'rxjs';
import { SortByPipe } from '../pipes/sort.pipe';
import {
    SectionInterface,
    SectionInterfaceContent,
    SectionInterfaceContentLinear,
    SectionInterfaceContentNested
} from './section.interface';

const SMALL_SCREEN_BREAKPOINT = 992;

@Component({
    selector: 'sections-toolbar',
    templateUrl: './sections-toolbar.component.html',
    styleUrls: ['./sections-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [IconComponent, RouterLinkActive, RouterLink, SortByPipe, ScrollbarDirective]
})
export class SectionsToolbarComponent {
    readonly sections = input<SectionInterface[]>([]);
    readonly sideCollapsed = model<boolean>(false);

    protected readonly search = signal('');
    protected readonly displayedSections = computed(() => this._filterSections(this.sections(), this.search()));
    protected readonly expandedSections = signal<Map<string, boolean>>(new Map());
    protected readonly allExpanded = computed(() => {
        const sections = this.displayedSections();
        const expanded = this.expandedSections();
        return sections.every((section) => expanded.get(section.header) === true);
    });
    protected readonly isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);

    private readonly _liveAnnouncer = inject(LiveAnnouncer);
    private readonly _router = inject(Router);
    private readonly _searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');
    private readonly _currentUrl = toSignal(
        this._router.events.pipe(
            filter((e): e is NavigationEnd => e instanceof NavigationEnd),
            map((e) => e.urlAfterRedirects || e.url)
        ),
        { initialValue: this._router.url }
    );

    private get _smallScreen(): boolean {
        return window.innerWidth < SMALL_SCREEN_BREAKPOINT;
    }

    constructor() {
        // Initialize sections in expanded state
        effect(() => {
            const sections = this.sections();
            const expandedMap = new Map<string, boolean>();
            sections.forEach((section) => {
                expandedMap.set(section.header, true);
            });
            this.expandedSections.set(expandedMap);
        });

        // Expand sections when searching and announce results
        effect(() => {
            const searchTerm = this.search().trim().toLowerCase();
            const sections = this.displayedSections();

            if (searchTerm) {
                // Expand all sections that have search results
                const expandedMap = new Map<string, boolean>();
                sections.forEach((section) => {
                    expandedMap.set(section.header, true);
                });
                this.expandedSections.set(expandedMap);

                // Announce search results
                const totalItemsCount = sections.reduce(
                    (prevValue, currentValue) => prevValue + currentValue.content.length,
                    0
                );
                this._liveAnnouncer.announce(`${totalItemsCount} search results found.`);
            }
        });

        // Handle initial activation
        this.onActivate();
    }

    /** @hidden type enforcing */
    $asSectionNestedContent = (sectionContent: SectionInterfaceContent[]): SectionInterfaceContentNested[] =>
        <any>sectionContent;

    /** Focus the search input, expanding the sidebar if necessary. */
    focusSearch(): void {
        if (this.sideCollapsed()) {
            this.sideCollapsed.set(false);
            // Wait for sidebar CSS transition (300ms) to complete before focusing
            setTimeout(() => this._focusInput(), 350);
        } else {
            this._focusInput();
        }
    }

    onActivate(): void {
        if (this._smallScreen && !this.sideCollapsed()) {
            this.sideCollapsed.set(true);
        }
    }

    toggleAllSections(): void {
        const sections = this.displayedSections();
        const expandedMap = new Map<string, boolean>();
        const shouldExpand = !this.allExpanded();

        sections.forEach((section) => {
            expandedMap.set(section.header, shouldExpand);
        });
        this.expandedSections.set(expandedMap);
    }

    protected onSearchChange(searchTerm: string): void {
        this.search.set(searchTerm);
    }

    protected onKeypressHandler(event: KeyboardEvent): void {
        if (event.code === 'Enter' || event.code === 'Space') {
            event.preventDefault();
            const _event = new MouseEvent('click');
            event.target?.dispatchEvent(_event);
        }
    }

    protected onItemClick(): void {
        this.sideCollapsed.set(false);
    }

    protected windowSize(): void {
        if (!this._smallScreen) {
            this.sideCollapsed.set(false);
            return;
        }

        this.onActivate();
    }

    protected toggleSection(sectionHeader: string): void {
        const expandedMap = new Map(this.expandedSections());
        const currentState = expandedMap.get(sectionHeader) ?? false;
        expandedMap.set(sectionHeader, !currentState);
        this.expandedSections.set(expandedMap);
    }

    protected isSectionExpanded(sectionHeader: string): boolean {
        return this.expandedSections().get(sectionHeader) ?? false;
    }

    protected sectionHasActiveItem(section: SectionInterface): boolean {
        const currentUrl = this._currentUrl();
        if (!currentUrl) {
            return false;
        }
        const normalizedUrl = currentUrl.split('?')[0].split('#')[0];
        return section.content.some((contentEl) => {
            if (this._isNestedContentItem(contentEl)) {
                return contentEl.subItems.some(
                    (sub) => normalizedUrl.endsWith('/' + sub.url) || normalizedUrl === '/' + sub.url
                );
            }
            return normalizedUrl.endsWith('/' + contentEl.url) || normalizedUrl === '/' + contentEl.url;
        });
    }

    protected trackBySection(index: number, section: SectionInterface): string {
        return section.header;
    }

    protected trackBySectionContent(index: number, content: SectionInterfaceContent): string {
        return content.name;
    }

    private _focusInput(): void {
        this._searchInput()?.nativeElement?.focus();
    }

    private _filterSections(sections: SectionInterface[], searchTerm: string): SectionInterface[] {
        const preparedSearchTerm = searchTerm?.trim().toLowerCase();
        if (!preparedSearchTerm) {
            return sections;
        }

        return sections
            .map((section) => {
                const content = section.content
                    .map((contentEl) => {
                        if (this._isNestedContentItem(contentEl)) {
                            const filtered = {
                                name: contentEl.name,
                                subItems: contentEl.subItems.filter((item) => this._filterFn(item, preparedSearchTerm))
                            };
                            return filtered.subItems.length ? filtered : null;
                        } else {
                            return this._filterFn(contentEl, preparedSearchTerm) ? contentEl : null;
                        }
                    })
                    .filter((v): v is SectionInterfaceContent => !!v);
                return { header: section.header, content };
            })
            .filter(({ content }) => content.length);
    }

    private _filterFn(item: SectionInterfaceContentLinear, searchTerm: string): boolean {
        return (
            item.url.toLowerCase().endsWith('/home') ||
            item.name.toLowerCase().includes(searchTerm) ||
            item.url.toLowerCase().includes(searchTerm)
        );
    }

    private _isNestedContentItem(item: SectionInterfaceContent): item is SectionInterfaceContentNested {
        return !!(<SectionInterfaceContentNested>item).subItems;
    }
}
