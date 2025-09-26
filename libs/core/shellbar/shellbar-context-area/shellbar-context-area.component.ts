import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ResizeObserverService } from '@fundamental-ngx/cdk/utils';
import { FD_SHELLBAR_COMPONENT } from '../tokens';

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
    private readonly _shellbar = inject(FD_SHELLBAR_COMPONENT);

    /** @hidden */
    private _resizeObserverService = inject(ResizeObserverService);

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    constructor(public el: ElementRef) {}

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
        const contextAreaItems: { el: HTMLElement; priority: number }[] = this._getContextAreaItemsWithPriority();
        while (this._shellbar._actionsExceedShellbarWidth()) {
            const shownElements = contextAreaItems.filter((item) => item?.el?.style?.display !== 'none');
            if (shownElements.length === 0) {
                break;
            }
            const lastItem = shownElements[shownElements.length - 1];
            if (lastItem?.el?.style) {
                lastItem.el.style.display = 'none';
            }
        }
    }

    /**
     * Iteratively shows elements if they can be displayed in the shellbar without causing the actions
     * to exceed the end of th eshellbar.
     */
    showElements(): void {
        this._getContextAreaItemsWithPriority().forEach((item) => {
            if (item?.el?.style) {
                item.el.style.display = '';
            }
        });
    }

    /**
     * Retrieves the child elements with their respective priority values.
     * The elements are sorted based on their priority, with elements having
     * higher priority shown first.
     */
    private _getContextAreaItemsWithPriority(): { el: HTMLElement; priority: number }[] {
        return [...this.el.nativeElement.children]
            .map((element: HTMLElement, index) => {
                const hasPriorityAttribute = element.hasAttribute && element.hasAttribute('fdShellbarHidePriority');
                const priority = hasPriorityAttribute
                    ? parseInt(element.getAttribute('fdShellbarHidePriority')!, 10)
                    : index + 1;

                return { el: element, priority };
            })
            .sort((a, b) => a.priority - b.priority);
    }
}
