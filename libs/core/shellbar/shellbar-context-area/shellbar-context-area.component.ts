import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    DestroyRef,
    ElementRef,
    QueryList
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ResizeObserverService } from '@fundamental-ngx/cdk/utils';
import { ShellbarHidePriorityDirective } from '../shellbar-overflow-priority.directive';

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
    @ContentChildren(ShellbarHidePriorityDirective, { descendants: true })
    priorityElements: QueryList<ShellbarHidePriorityDirective>;

    /** @hidden */
    constructor(
        private el: ElementRef,
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
        const elements = this.priorityElements.toArray().sort((a, b) => a.priority - b.priority);
        const availableWidth = this.getAvailableWidth();
        let allItemsWidth = this.calculateShownElementsWidth(elements);

        // Hide elements until the total width is within the available width
        while (allItemsWidth > availableWidth) {
            const shownElements = elements.filter((el) => el.el.nativeElement.style.display !== 'none');
            if (shownElements.length === 0) {
                break;
            }
            shownElements[shownElements.length - 1].el.nativeElement.style.display = 'none';
            allItemsWidth = this.calculateShownElementsWidth(elements);
        }

        // Show elements if there is enough space
        let hiddenElements = elements.filter((el) => el.el.nativeElement.style.display === 'none');
        while (hiddenElements.length > 0 && allItemsWidth <= availableWidth) {
            hiddenElements[0].el.nativeElement.style.display = '';
            allItemsWidth = this.calculateShownElementsWidth(elements);
            if (allItemsWidth > availableWidth) {
                hiddenElements[0].el.nativeElement.style.display = 'none';
                break;
            }
            hiddenElements = elements.filter((el) => el.el.nativeElement.style.display === 'none');
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
    private calculateShownElementsWidth(elements: ShellbarHidePriorityDirective[]): number {
        const shownElements = elements.filter((el) => el.el.nativeElement.style.display !== 'none');
        const totalWidth = shownElements.reduce((acc, el) => acc + el.el.nativeElement.clientWidth, 0);
        return totalWidth + this.calculateTotalGap(shownElements.length);
    }

    /**
     * Gets the available width of the container.
     */
    private getAvailableWidth(): number {
        return this.el.nativeElement.offsetWidth;
    }
}
