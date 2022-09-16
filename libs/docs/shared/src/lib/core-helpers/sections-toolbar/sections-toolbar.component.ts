import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {
    SectionInterface,
    SectionInterfaceContent,
    SectionInterfaceContentLinear,
    SectionInterfaceContentNested
} from './section.interface';
import { BehaviorSubject } from 'rxjs';

const SMALL_SCREEN_BREAKPOINT = 992;
@Component({
    selector: 'sections-toolbar',
    templateUrl: './sections-toolbar.component.html',
    styleUrls: ['./sections-toolbar.component.scss']
})
export class SectionsToolbarComponent implements OnInit, OnChanges {
    @Input() sections: SectionInterface[];

    @Output()
    readonly sideCollapsedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input()
    sideCollapsed: BehaviorSubject<boolean>;

    search = '';

    displayedSections: SectionInterface[] = [];

    private get _smallScreen(): boolean {
        return window.innerWidth < SMALL_SCREEN_BREAKPOINT;
    }

    /** @hidden type enforcing */
    $asSectionNestedContent = (sectionContent: SectionInterfaceContent[]): SectionInterfaceContentNested[] =>
        <any>sectionContent;

    ngOnInit(): void {
        this.onActivate();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.sections) {
            this.onSearchChange(this.search);
        }
    }

    onSearchChange(searchTerm: string): void {
        this.search = searchTerm;
        const preparedSearchTerm = searchTerm?.trim().toLowerCase();
        if (!preparedSearchTerm) {
            this.displayedSections = this.sections;
        } else {
            this.displayedSections = this.sections
                .map((section) => {
                    const content = section.content
                        .map((contentEl) => {
                            if (this._isNestedContentItem(contentEl)) {
                                const filtered = {
                                    name: contentEl.name,
                                    subItems: contentEl.subItems.filter((item) =>
                                        this._filterFn(item, preparedSearchTerm)
                                    )
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
    }

    onKeypressHandler(event: KeyboardEvent): void {
        if (event.code === 'Enter' || event.code === 'Space') {
            event.preventDefault();
            const _event = new MouseEvent('click');
            event.target?.dispatchEvent(_event);
        }
    }

    onItemClick(): void {
        this.sideCollapsed.next(false);
    }

    onActivate(): void {
        if (this._smallScreen && !this.sideCollapsed.value) {
            this._setCollapseState(true);
        }
    }

    windowSize(): void {
        if (!this._smallScreen) {
            this._setCollapseState(false);
            return;
        }

        this.onActivate();
        this.sideCollapsedChange.emit(this.sideCollapsed.value);
    }

    trackBySection(index: number, section: SectionInterface): string {
        return section.header;
    }

    trackBySectionContent(index: number, content: SectionInterfaceContent): string {
        return content.name;
    }

    private _setCollapseState(state: boolean): void {
        this.sideCollapsed?.next(state);
        this.sideCollapsedChange.emit(state);
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
