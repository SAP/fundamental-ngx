import {
    AfterContentInit,
    ChangeDetectorRef,
    ContentChild,
    ContentChildren,
    ElementRef,
    forwardRef,
    HostBinding,
    Inject,
    Input,
    OnDestroy,
    Optional,
    QueryList,
    Component
} from '@angular/core';
import { combineLatest, Observable, startWith, Subscription } from 'rxjs';

import { NestedListStateService } from '../nested-list-state.service';
import { NestedItemComponent } from '../nested-item/nested-item.component';
import { NestedItemService } from '../nested-item/nested-item.service';
import { NestedListKeyboardService } from '../nested-list-keyboard.service';
import { NestedListInterface } from './nested-list.interface';
import { NestedListHeaderDirective } from '../nested-list-directives';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { FdLanguage, FD_LANGUAGE, TranslationResolver } from '@fundamental-ngx/i18n';
import {
    ContentDensityObserver,
    contentDensityObserverProviders,
    ContentDensityMode
} from '@fundamental-ngx/core/content-density';

@Component({
    template: ` <ng-content></ng-content> `,
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[cxNestedList], [fdx-nested-list], ul[fdx-nested-list]',
    providers: [
        contentDensityObserverProviders({ modifiers: { [ContentDensityMode.COMPACT]: 'fdx-nested-list--compact' } })
    ]
})
export class NestedListComponent implements AfterContentInit, NestedListInterface, OnDestroy {
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
    @ContentChildren(NestedListComponent, { descendants: true })
    private _nestedLists: QueryList<NestedListComponent>;

    /** @hidden */
    private _nestedItemsChangesSubscription = new Subscription();

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
    private readonly _translationResolver = new TranslationResolver();

    /** @hidden */
    constructor(
        @Optional() private _nestedItemService: NestedItemService,
        private _nestedListStateService: NestedListStateService,
        private _nestedListKeyboardService: NestedListKeyboardService,
        private _elementRef: ElementRef,
        private _changeDetectionRef: ChangeDetectorRef,
        @Inject(FD_LANGUAGE) private _language$: Observable<FdLanguage>,
        private _contentDensityObserver: ContentDensityObserver
    ) {
        if (this._nestedItemService) {
            this._nestedItemService.list = this;
        }
        _contentDensityObserver.subscribe();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._nestedItemsChangesSubscription.unsubscribe();
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
        this._nestedItemsChangesSubscription.unsubscribe();

        const nestedLevel: number = this._getNestedLevel();

        this._setAccessibilityProperties(nestedLevel);

        const itemChangesSub = combineLatest([
            this._language$,
            this.nestedItems.changes.pipe(startWith(undefined))
        ]).subscribe(([lang]) => {
            this._nestedListKeyboardService.refresh$.next();
            this._setAriaAttributes(nestedLevel, lang);
            /** Adding class with the nested level */
            this._elementRef.nativeElement.classList.add('level-' + nestedLevel);
        });

        this._nestedItemsChangesSubscription.add(itemChangesSub);
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
            item.linkItem.ariaDescribedby = this._nestedListHeader?.id || null;
            item.linkItem._ariaLabel = this._translationResolver.resolve(lang, 'coreNestedList.linkItemAriaLabel', {
                itemDetails: item.linkItem.getTitle(),
                index: i + 1,
                total: this.nestedItems.length,
                selectedDescription:
                    !this._nestedListStateService.selectable && item.linkItem.selected
                        ? ', ' + this.ariaLabelSelected
                        : ''
            });
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
