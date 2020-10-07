import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

/**
 * The action bar title component.
 *
 * ```html
 * <fd-action-bar>
 *     <div fd-action-bar-header>
 *         <div fd-action-bar-title>Page Title</div>
 *     </div>
 * <fd-action-bar>
 * ```
 */
@Component({
    // tslint:disable-next-line:component-selector
    selector: '[fd-action-bar-title]',
    template: `
        <h2 class="fd-title fd-title--h3">
            <ng-content></ng-content>
        </h2>
    `,
    host: {
        class: 'fd-action-bar__title'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionBarTitleComponent {}
