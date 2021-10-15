import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

/**
 * Description of the panel title.
 *
 * ```html
 * <fd-layout-panel>
 *     <fd-layout-panel-header>
 *         <fd-layout-panel-head>
 *             <fd-layout-panel-description>This is a description for a panel title!</fd-layout-panel-description>
 *         </fd-layout-panel-head>
 *     </fd-layout-panel-header>
 * </fd-layout-panel>
 * ```
 */
@Component({
    selector: 'fd-layout-panel-description',
    templateUrl: './layout-panel-description.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutPanelDescriptionComponent {}
