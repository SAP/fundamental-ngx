import { ChangeDetectionStrategy, Component, ElementRef, QueryList, ViewChildren, inject, output } from '@angular/core';
import { FD_SHELLBAR_COMPONENT } from '../tokens';

/**
 * Component representing the context area of the shellbar.
 * It manages the visibility of its child elements based on the available width.
 * Child items can be positioned left or right using the fdShellbarPosition directive.
 */
@Component({
    selector: 'fd-shellbar-context-area',
    standalone: true,
    template: `
        <div
            class="fd-shellbar__group fd-shellbar__group--context-area"
            data-position="left"
            role="group"
            #contextAreaGroup
        >
            <ng-content select="[fdShellbarPosition='left'], :not([fdShellbarPosition])"></ng-content>
        </div>
        <div
            class="fd-shellbar__group fd-shellbar__group--context-area"
            data-position="right"
            role="group"
            #contextAreaGroup
        >
            <ng-content select="[fdShellbarPosition='right']"></ng-content>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[style.display]': '"contents"'
    },
    styles: [
        `
            .fd-shellbar__group--context-area {
                min-width: 0;
            }
        `
    ]
})
export class ShellbarContextAreaComponent {
    /** @hidden */
    @ViewChildren('contextAreaGroup', { read: ElementRef })
    readonly contextAreaGroups: QueryList<ElementRef<HTMLElement>>;

    /** Event emitted when items in the context area are hidden or shown. Event parameter is an array of all the items that are hidden. */
    contentItemVisibilityChange = output<HTMLElement[]>();

    /** Event emitted when an individual element is hidden. */
    elementHidden = output<HTMLElement>();

    /** Event emitted when an individual element is shown. */
    elementShown = output<HTMLElement>();

    /** @hidden */
    readonly el: ElementRef = inject(ElementRef);

    /** @hidden */
    private readonly _shellbar = inject(FD_SHELLBAR_COMPONENT);

    /** @hidden */
    private _hiddenItems: HTMLElement[];

    /**
     * Iteratively hides elements if the end of the actions exceed the end of the shellbar.
     */
    hideElementsIfNeeded(): void {
        const contextAreaItems: { el: HTMLElement; priority: number }[] = this._getContextAreaItemsWithPriority();
        const previouslyHidden = new Set(
            contextAreaItems.filter((item) => item.el.style.display === 'none').map((item) => item.el)
        );
        const suppressedSeparators = new Set([...previouslyHidden].filter((item) => this._isSeparator(item)));
        this._updateSeparatorVisibility(suppressedSeparators);
        while (this._shellbar._actionsExceedShellbarWidth()) {
            const shownElements = contextAreaItems.filter(
                (item) => item?.el?.style?.display !== 'none' && !item?.el?.hasAttribute('fdShellbarNeverHide')
            );
            if (shownElements.length === 0) {
                break;
            }
            const lastItem = shownElements[shownElements.length - 1];
            if (lastItem?.el?.style) {
                lastItem.el.style.display = 'none';
                if (this._isSeparator(lastItem.el)) {
                    suppressedSeparators.add(lastItem.el);
                }
            }
        }

        // Hide separators if all other items in their group are hidden
        this._updateSeparatorVisibility(suppressedSeparators);
        const newHiddenItems = contextAreaItems
            .filter((item) => item.el.style.display === 'none')
            .map((item) => item.el);
        newHiddenItems.forEach((item) => {
            if (!previouslyHidden.has(item)) {
                this.elementHidden.emit(item);
            }
        });

        if (!this._arraysEqual(this._hiddenItems, newHiddenItems)) {
            this._hiddenItems = newHiddenItems;
            this.contentItemVisibilityChange.emit(newHiddenItems);
        }
    }

    /**
     * Iteratively shows elements if they can be displayed in the shellbar without causing the actions
     * to exceed the end of the shellbar.
     */
    showElements(): void {
        const contextAreaItems = this._getContextAreaItemsWithPriority();
        const previouslyHidden = new Set(
            contextAreaItems.filter((item) => item.el.style.display === 'none').map((item) => item.el)
        );
        contextAreaItems.forEach((item) => {
            if (item?.el?.style) {
                item.el.style.display = '';
            }
        });

        // Show separators if there are visible items in their group
        this._updateSeparatorVisibility();
        contextAreaItems.forEach(({ el }) => {
            if (previouslyHidden.has(el) && el.style.display !== 'none') {
                this.elementShown.emit(el);
            } else if (!previouslyHidden.has(el) && el.style.display === 'none') {
                this.elementHidden.emit(el);
            }
        });
    }

    /**
     * Retrieves the child elements with their respective priority values.
     * The elements are sorted based on their priority, with elements having
     * higher priority shown first.
     */
    private _getContextAreaItemsWithPriority(): { el: HTMLElement; priority: number }[] {
        // Get direct children from the DOM (all elements inside the context area groups)
        const contextAreaGroups = this.el.nativeElement.querySelectorAll('.fd-shellbar__group--context-area');
        const allElements: HTMLElement[] = [];

        contextAreaGroups.forEach((group: HTMLElement) => {
            // Get direct children of each group
            Array.from(group.children).forEach((child) => {
                allElements.push(child as HTMLElement);
            });
        });

        return allElements
            .map((element, index) => {
                const hasPriorityAttribute = element.hasAttribute && element.hasAttribute('fdShellbarHidePriority');
                const priorityValue = element.getAttribute('fdShellbarHidePriority');
                const priority = hasPriorityAttribute && priorityValue ? parseInt(priorityValue, 10) : index + 1;

                return { el: element, priority };
            })
            .sort((a, b) => a.priority - b.priority);
    }

    /**
     * Compares two arrays of HTMLElements for equality.
     * Checks membership regardless of order.
     */
    private _arraysEqual(arr1: HTMLElement[] | undefined, arr2: HTMLElement[]): boolean {
        if (!arr1 && arr2.length === 0) {
            return true;
        }
        if (!arr1 || arr1.length !== arr2.length) {
            return false;
        }
        return arr1.every((el) => arr2.includes(el));
    }

    /**
     * Updates separator visibility based on whether there are visible non-separator items
     * in each context area group.
     */
    private _updateSeparatorVisibility(suppressedSeparators = new Set<HTMLElement>()): void {
        const contextAreaGroups = this.el.nativeElement.querySelectorAll('.fd-shellbar__group--context-area');

        contextAreaGroups.forEach((group: HTMLElement) => {
            const children = Array.from(group.children) as HTMLElement[];

            // Separate separators from other items
            const separators = children.filter((el) => this._isSeparator(el));
            const nonSeparators = children.filter((el) => !this._isSeparator(el));

            // Check if there are any visible non-separator items
            const hasVisibleNonSeparators = nonSeparators.some((el) => el.style.display !== 'none');

            // Update separator visibility
            separators.forEach((separator) => {
                if (hasVisibleNonSeparators && !suppressedSeparators.has(separator)) {
                    separator.style.display = '';
                } else {
                    separator.style.display = 'none';
                }
            });
        });
    }

    /**
     * Checks if an element is a shellbar separator.
     */
    private _isSeparator(element: HTMLElement): boolean {
        return (
            element.tagName.toLowerCase() === 'fd-shellbar-separator' ||
            element.classList.contains('fd-shellbar__separator')
        );
    }
}
