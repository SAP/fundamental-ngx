import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    ElementRef,
    inject,
    output
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ResizeObserverService } from '@fundamental-ngx/cdk/utils';
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
        <div class="fd-shellbar__group fd-shellbar__group--context-area" data-position="left">
            <ng-content select="[fdShellbarPosition='left'], :not([fdShellbarPosition])"></ng-content>
        </div>
        <div class="fd-shellbar__group fd-shellbar__group--context-area" data-position="right">
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
export class ShellbarContextAreaComponent implements AfterViewInit {
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
    private readonly _resizeObserverService = inject(ResizeObserverService);

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private _hiddenItems: HTMLElement[];

    /** @hidden */
    ngAfterViewInit(): void {
        this._resizeObserverService
            .observe(this.el.nativeElement)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(() => {
                this.showElements();
                this.hideElementsIfNeeded();
            });
    }

    /**
     * Iteratively hides elements if the end of the actions exceed the end of the shellbar.
     */
    hideElementsIfNeeded(): void {
        const newHiddenItems: HTMLElement[] = [];
        const contextAreaItems: { el: HTMLElement; priority: number }[] = this._getContextAreaItemsWithPriority();
        while (this._shellbar._actionsExceedShellbarWidth()) {
            const shownElements = contextAreaItems.filter(
                (item) =>
                    item?.el?.style?.display !== 'none' &&
                    !item?.el?.hasAttribute('fdShellbarNeverHide') &&
                    !item?.el?.hasAttribute('fdshellbarneverhide')
            );
            if (shownElements.length === 0) {
                break;
            }
            const lastItem = shownElements[shownElements.length - 1];
            if (lastItem?.el?.style) {
                newHiddenItems.push(lastItem.el);
                lastItem.el.style.display = 'none';
                this.elementHidden.emit(lastItem.el);
            }
        }
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
        this._getContextAreaItemsWithPriority().forEach((item) => {
            if (item?.el?.style) {
                const wasHidden = item.el.style.display === 'none';
                item.el.style.display = '';
                if (wasHidden) {
                    this.elementShown.emit(item.el);
                }
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
     * Sorts both arrays and checks if all elements are the same.
     */
    private _arraysEqual(arr1: HTMLElement[] | undefined, arr2: HTMLElement[]): boolean {
        if (!arr1 && arr2.length === 0) {
            return true;
        }
        if (!arr1 || arr1.length !== arr2.length) {
            return false;
        }
        const sorted1 = [...arr1].sort();
        const sorted2 = [...arr2].sort();
        return sorted1.every((el, index) => el === sorted2[index]);
    }
}
