import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

/**
 * Description of the panel title.
 *
 * ```html
 * <fd-panel>
 *     <fd-panel-header>
 *         <fd-panel-head>
 *             <fd-panel-description>This is a description for a panel title!</fd-panel-description>
 *         </fd-panel-head>
 *     </fd-panel-header>
 * </fd-panel>
 * ```
 */
@Component({
    selector: 'fd-panel-description',
    templateUrl: './panel-description.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanelDescriptionComponent {}
