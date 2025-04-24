import {
    AfterContentInit,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    DestroyRef,
    ElementRef,
    HostBinding,
    Inject,
    Input,
    Optional,
    QueryList,
    forwardRef,
    inject
} from '@angular/core';
import { Observable, combineLatest, startWith } from 'rxjs';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { FD_LANGUAGE, FdLanguage, TranslationResolver } from '@fundamental-ngx/i18n';
import { NestedItemComponent } from '../nested-item/nested-item.component';
import { NestedItemService } from '../nested-item/nested-item.service';
import { NestedListHeaderDirective } from '../nested-list-directives';
import { NestedListKeyboardService } from '../nested-list-keyboard.service';
import { NestedListStateService } from '../nested-list-state.service';
import { NestedListInterface } from './nested-list.interface';

@Component({
    template: ` <ng-content></ng-content> `,
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[cxNestedList], [fdx-nested-list], ul[fdx-nested-list]',
    standalone: true,
    providers: [contentDensityObserverProviders()]
})
export class NestedListComponent implements AfterContentInit, NestedListInterface {
    /** In case the user wants to no use icons for items in this list */
    @Input()
    @HostBinding('class.fdx-nested-list--text-only')
    textOnly = false;

    /** Aria defines role description for the Nested List Tree. */
    @Input()
    ariaRoledescriptionTree = 'Navigation List Tree';

    /** Aria defines role description for the Nested List MenuBar. */
    @Input()
    ariaRoledescriptionMenuBar = 'Navigation List Menu Bar';

    /** Aria defines aria label for the selected item when the list with disabled selection. */
    @Input()
    ariaLabelSelected = 'Selected';

    /** @hidden */
    @HostBinding('class.fdx-nested-list')
    fdNestedListItemClass = true;

    /** @hidden */
    @HostBinding('attr.aria-hidden')
    hidden = false;

    /**
     * @hidden
     * This variable is mostly to keep track of this list's children. There is not usage of it inside this directive,
     * but it's used by services and NestedItemComponent by itself,
     */
    @ContentChildren(forwardRef(() => NestedItemComponent))
    nestedItems: QueryList<NestedItemComponent>;

    /** @hidden */
    @ContentChild(NestedListHeaderDirective)
    private _nestedListHeader: NestedListHeaderDirective;

    /** @hidden */
    @ContentChildren(forwardRef(() => NestedListComponent), { descendants: true })
    private _nestedLists: QueryList<NestedListComponent>;

    /** @hidden */
    @HostBinding('attr.role')
    private _role = 'tree';

    /** @hidden */
    @HostBinding('attr.aria-roledescription')
    private _ariaRoledescription: Nullable<string> = this.ariaRoledescriptionTree;

    /** @hidden */
    @HostBinding('attr.aria-haspopup')
    private _ariaHaspopup: Nullable<string> = null;

    /** @hidden */
    @HostBinding('attr.tabindex')
    private _tabindex = '-1';

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private readonly _translationResolver = new TranslationResolver();

    /** @hidden */
    constructor(
        @Optional() private _nestedItemService: NestedItemService,
        private _nestedListStateService: NestedListStateService,
        private _nestedListKeyboardService: NestedListKeyboardService,
        private _elementRef: ElementRef,
        private _changeDetectionRef: ChangeDetectorRef,
        @Inject(FD_LANGUAGE) private _language$: Observable<FdLanguage>
    ) {
        if (this._nestedItemService) {
            this._nestedItemService.list = this;
        }
        inject(ContentDensityObserver).subscribe();
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this._handleNestedLevel();
    }

    /** @hidden */
    detectChanges(): void {
        this._changeDetectionRef.markForCheck();
    }

    /** @hidden */
    private _handleNestedLevel(): void {
        const nestedLevel: number = this._getNestedLevel();

        this._setAccessibilityProperties(nestedLevel);

        combineLatest([this._language$, this.nestedItems.changes.pipe(startWith(undefined))])
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(([lang]) => {
                this._nestedListKeyboardService.refresh$.next();
                this._setAriaAttributes(nestedLevel, lang);
                /** Adding class with the nested level */
                this._elementRef.nativeElement.classList.add('level-' + nestedLevel);
            });
    }

    /**
     * @hidden
     * Method, that checks how deep is the list element
     */
    private _getNestedLevel(): number {
        let element = this._elementRef.nativeElement;
        const parentElements: Element[] = [];

        /** Method that gathers all the parentNode elements of current NestedListComponent element */
        while (element.parentNode) {
            parentElements.unshift(element);
            element = element.parentNode;
        }

        /** Filter only elements, that has `fdx-nested-list` directive attribute */
        const filteredParentElements = parentElements.filter((_element) => _element.hasAttribute('fdx-nested-list'));

        let retVal = filteredParentElements.length;

        if (this._nestedItemService?.popover) {
            retVal += 1;
        }

        return retVal;
    }

    /** @hidden */
    private _setAriaAttributes(level: number, lang: FdLanguage): void {
        this.nestedItems.forEach((item, i) => {
            item._ariaLevel = level;
            if (!item.linkItem) {
                return;
            } else {
                item.linkItem.ariaDescribedby = this._nestedListHeader?.id || null;
                item.linkItem._ariaLabel = this._translationResolver.resolve(lang, 'coreNestedList.linkItemAriaLabel', {
                    itemDetails: item.linkItem.getTitle(),
                    index: i + 1, // TODO: this property has been deprecated and will be removed from translations
                    total: this.nestedItems.length, // TODO: this property has been deprecated and will be removed from translations
                    selectedDescription:
                        !this._nestedListStateService.selectable && item.linkItem.selected
                            ? ', ' + this.ariaLabelSelected
                            : ''
                });
            }
        });

        this._changeDetectionRef.detectChanges();
    }

    /** @hidden */
    private _setAccessibilityProperties(level: number): void {
        if (this._nestedListStateService.condensed && level === 1) {
            this._ariaRoledescription = this.ariaRoledescriptionMenuBar;
        }

        if (level > 1 || (this._nestedItemService?.popover && !this._nestedListStateService.condensed)) {
            this._role = 'group';
            this._ariaRoledescription = null;
        }

        if (this._nestedItemService?.popover) {
            this._ariaHaspopup = 'tree';
        }
    }
}
