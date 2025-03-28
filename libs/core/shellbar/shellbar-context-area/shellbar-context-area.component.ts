import { ChangeDetectionStrategy, Component, ElementRef, inject } from '@angular/core';
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
export class ShellbarContextAreaComponent {
    /** @hidden */
    private readonly _shellbar = inject(FD_SHELLBAR_COMPONENT);

    /** @hidden */
    constructor(public el: ElementRef) {}

    /**
     * Iteratively hides elements if the end of the actions exceed the end of the shellbar.
     */
    hideElementsIfNeeded(): void {
        const elements: { el: HTMLElement; priority: number }[] = this._getElementsWithPriority();
        while (this._shellbar._actionsExceedShellbarWidth()) {
            const shownElements = elements.filter((el) => el.el.style.display !== 'none');
            if (shownElements.length === 0) {
                break;
            }
            shownElements[shownElements.length - 1].el.style.display = 'none';
        }
    }

    /**
     * Iteratively shows elements if they can be displayed in the shellbar without causing the actions
     * to exceed the end of th eshellbar.
     */
    showElements(): void {
        this._getElementsWithPriority().forEach((el) => {
            el.el.style.display = '';
        });
    }

    /**
     * Retrieves the child elements with their respective priority values.
     * The elements are sorted based on their priority, with elements having
     * higher priority shown first.
     */
    private _getElementsWithPriority(): { el: HTMLElement; priority: number }[] {
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
}
