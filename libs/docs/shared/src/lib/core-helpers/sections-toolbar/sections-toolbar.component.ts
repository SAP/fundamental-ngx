import { LiveAnnouncer } from '@angular/cdk/a11y';
import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, input, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { NestedListModule } from '@fundamental-ngx/core/nested-list';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { SideNavigationModule } from '@fundamental-ngx/core/side-navigation';
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
    imports: [
        ButtonComponent,
        InputGroupModule,
        FormsModule,
        SideNavigationModule,
        NestedListModule,
        NgTemplateOutlet,
        RouterLinkActive,
        RouterLink,
        SortByPipe,
        ScrollbarDirective
    ]
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

    private readonly _liveAnnouncer = inject(LiveAnnouncer);

    private get _smallScreen(): boolean {
        return window.innerWidth < SMALL_SCREEN_BREAKPOINT;
    }

    constructor() {
        // Initialize sections in collapsed state
        effect(() => {
            const sections = this.sections();
            const expandedMap = new Map<string, boolean>();
            sections.forEach((section) => {
                expandedMap.set(section.header, false);
            });
            this.expandedSections.set(expandedMap);
        });

        // Announce search results when search changes
        effect(() => {
            const searchTerm = this.search().trim().toLowerCase();
            if (!searchTerm) {
                return;
            }

            const totalItemsCount = this.displayedSections().reduce(
                (prevValue, currentValue) => prevValue + currentValue.content.length,
                0
            );
            this._liveAnnouncer.announce(`${totalItemsCount} search results found.`);
        });

        // Handle initial activation
        this.onActivate();
    }

    /** @hidden type enforcing */
    $asSectionNestedContent = (sectionContent: SectionInterfaceContent[]): SectionInterfaceContentNested[] =>
        <any>sectionContent;

    onActivate(): void {
        if (this._smallScreen && !this.sideCollapsed()) {
            this.sideCollapsed.set(true);
        }
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

    protected toggleAllSections(): void {
        const sections = this.displayedSections();
        const expandedMap = new Map<string, boolean>();
        const shouldExpand = !this.allExpanded();

        sections.forEach((section) => {
            expandedMap.set(section.header, shouldExpand);
        });
        this.expandedSections.set(expandedMap);
    }

    protected isSectionExpanded(sectionHeader: string): boolean {
        return this.expandedSections().get(sectionHeader) ?? false;
    }

    protected trackBySection(index: number, section: SectionInterface): string {
        return section.header;
    }

    protected trackBySectionContent(index: number, content: SectionInterfaceContent): string {
        return content.name;
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
