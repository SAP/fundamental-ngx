import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, ElementRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ResizeObserverService } from '@fundamental-ngx/cdk/utils';

/**
 * Component representing the context area of the shellbar.
 * It manages the visibility of its child elements based on the available width.
 */
@Component({
    selector: 'fd-shellbar-context-area',
    standalone: true,
    template: ` <ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.fd-shellbar__group]': 'true',
        '[class.fd-shellbar__group--context-area]': 'true'
    },
    styles: [
        `
            :host {
                min-width: 0;
            }
        `
    ]
})
export class ShellbarContextAreaComponent implements AfterViewInit {
    /** @hidden */
    constructor(
        public el: ElementRef,
        private resizeObserverService: ResizeObserverService,
        private _destroyRef: DestroyRef
    ) {}

    /** @hidden */
    ngAfterViewInit(): void {
        this.resizeObserverService
            .observe(this.el)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(() => this.updateVisibility());
        requestAnimationFrame(() => this.updateVisibility());
    }

    /**
     * Updates the visibility of the child elements based on the available width.
     * This method ensures that the elements with the highest priority are shown
     * while hiding the lower priority elements if there is not enough space.
     *
     * The method works by:
     * 1. Sorting the elements based on their priority.
     * 2. Calculating the total width of the currently shown elements.
     * 3. Comparing the total width with the available width.
     * 4. Iteratively hiding the last shown element if the total width exceeds the available width.
     * 5. Iteratively showing the first hidden element if there is enough space.
     * 6. Ensuring all elements fit within the available width without recursion.
     */
    updateVisibility(): void {
        const elements: { el: HTMLElement; priority: number }[] = this.getElementsWithPriority();
        const availableWidth = this.getAvailableWidth();
        const allItemsWidth = this.calculateShownElementsWidth(elements);

        this.hideElementsIfNeeded(elements, availableWidth, allItemsWidth);
        this.showElementsIfNeeded(elements, availableWidth, allItemsWidth);
    }

    /**
     * Retrieves the child elements with their respective priority values.
     * The elements are sorted based on their priority, with elements having
     * higher priority shown first.
     */
    private getElementsWithPriority(): { el: HTMLElement; priority: number }[] {
        return [...this.el.nativeElement.childNodes]
            .map((element: HTMLElement, index) => {
                const hasPriorityAttribute = element.hasAttribute && element.hasAttribute('fdShellbarHidePriority');
                const priority = hasPriorityAttribute
                    ? parseInt(element.getAttribute('fdShellbarHidePriority')!, 10)
                    : index + 1;

                return { el: element, priority };
            })
            .sort((a, b) => a.priority - b.priority);
    }

    /**
     * Hides elements if the total width exceeds the available width.
     * This method will hide the last shown element iteratively until the total width
     * fits within the available width.
     */
    private hideElementsIfNeeded(
        elements: {
            el: HTMLElement;
            priority: number;
        }[],
        availableWidth: number,
        allItemsWidth: number
    ): void {
        while (allItemsWidth > availableWidth) {
            const shownElements = elements.filter((el) => el.el.style.display !== 'none');
            if (shownElements.length === 0) {
                break;
            }
            shownElements[shownElements.length - 1].el.style.display = 'none';
            allItemsWidth = this.calculateShownElementsWidth(elements);
        }
    }

    /**
     * Shows elements if there is enough space available.
     * This method will show the first hidden element iteratively as long as there
     * is sufficient space, and hide the element again if the space is exceeded.
     */
    private showElementsIfNeeded(
        elements: {
            el: HTMLElement;
            priority: number;
        }[],
        availableWidth: number,
        allItemsWidth: number
    ): void {
        let hiddenElements = elements.filter((el) => el.el.style.display === 'none');
        while (hiddenElements.length > 0 && allItemsWidth <= availableWidth) {
            hiddenElements[0].el.style.display = '';
            allItemsWidth = this.calculateShownElementsWidth(elements);
            if (allItemsWidth > availableWidth) {
                hiddenElements[0].el.style.display = 'none';
                break;
            }
            hiddenElements = elements.filter((el) => el.el.style.display === 'none');
        }
    }

    /**
     * Calculates the total gap between the visible elements.
     * Avoids negative gap for single or no elements.
     */
    private calculateTotalGap(elementsLength: number): number {
        const gap = parseFloat(window.getComputedStyle(this.el.nativeElement).gap || '0');
        return gap * Math.max(elementsLength - 1, 0);
    }

    /**
     * Calculates the total width of the shown elements, including the gaps.
     */
    private calculateShownElementsWidth(elements: { el: HTMLElement; priority: number }[]): number {
        const shownElements = elements.filter((el) => el.el.style.display !== 'none');
        const totalWidth = shownElements.reduce((acc, el) => acc + el.el.clientWidth, 0);
        return totalWidth + this.calculateTotalGap(shownElements.length);
    }

    /**
     * Gets the available width of the container.
     */
    private getAvailableWidth(): number {
        return this.el.nativeElement.offsetWidth;
    }
}
