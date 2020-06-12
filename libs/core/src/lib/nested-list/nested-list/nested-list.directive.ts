import {
    AfterContentInit,
    ChangeDetectorRef,
    ContentChildren,
    Directive,
    ElementRef,
    forwardRef,
    HostBinding,
    Input,
    Optional,
    QueryList
} from '@angular/core';
import { NestedListStateService } from '../nested-list-state.service';
import { NestedItemDirective } from '../nested-item/nested-item.directive';
import { NestedItemService } from '../nested-item/nested-item.service';
import { NestedListKeyboardService } from '../nested-list-keyboard.service';
import { NestedListInterface } from './nested-list.interface';

@Directive({
    selector: '[fdNestedList], [fd-nested-list]'
})
export class NestedListDirective implements AfterContentInit, NestedListInterface {

    /** In case the user wants to no use icons for items in this list */
    @Input()
    @HostBinding('class.fd-nested-list--text-only')
    textOnly: boolean = false;

    /** In case the user wants put compact mode in this list */
    @Input()
    @HostBinding('class.fd-nested-list--compact')
    compact: boolean = false;

    /** @hidden */
    @HostBinding('class.fd-nested-list')
    fdNestedListItemClass: boolean = true;

    /** @hidden */
    @HostBinding('attr.aria-hidden')
    hidden: boolean = false;

    /**
     * @hidden
     * This variable is mostly to keep track of this list's children. There is not usage of it inside this directive,
     * but it's used by services and NestedItemDirective by itself,
     */
    @ContentChildren(forwardRef(() => NestedItemDirective))
    nestedItems: QueryList<NestedItemDirective>;

    /** @hidden */
    constructor(
        @Optional() private _nestedItemService: NestedItemService,
        private _nestedListStateService: NestedListStateService,
        private _nestedListKeyboardService: NestedListKeyboardService,
        private _elementRef: ElementRef,
        private _changeDetectionRef: ChangeDetectorRef
    ) {
        if (this._nestedItemService) {
            this._nestedItemService.list = this;
        }
    }

    /** @hidden */
    ngAfterContentInit(): void {
        let nestedLevel: number = this._getNestedLevel();
        /** If there is condensed mode, maximum 2nd level class of nest can be added */
        if (this._nestedListStateService.condensed) {
            nestedLevel = Math.min(...[nestedLevel, 2]);
        }
        this.nestedItems.changes.subscribe(() => this._nestedListKeyboardService.refresh$.next());
        this._handleNestedLevel(nestedLevel);
    }

    /** @hidden */
    detectChanges(): void {
        this._changeDetectionRef.markForCheck();
    }

    /** @hidden */
    private _handleNestedLevel(level: number): void {
        /** Adding class with the nested level */
        this._elementRef.nativeElement.classList.add('level-' + level);
    }

    /**
     * @hidden
     * Method, that checks how deep is the list element
     */
    private _getNestedLevel(): number {
        let element = this._elementRef.nativeElement;
        const parentElements = [];

        /** Method that gathers all of the parentNode elements of current NestedListDirective element */
        while (element.parentNode) {
            parentElements.unshift(element);
            element = element.parentNode;
        }

        /** Filter only elements, that has `fd-nested-list` directive attribute */
        const filteredParentElements = parentElements.filter(_element => _element.hasAttribute('fd-nested-list'));
        return filteredParentElements.length;
    }
}
