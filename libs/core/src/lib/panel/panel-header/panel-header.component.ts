import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

let panelHeaderUniqueId: number = 0;

/**
 * Applies the panel header style to a div element
 * and serves as a container for the Panel Expand component,
 * the Panel Title and an optional Toolbar component.
 *
 * ```html
 * <div fd-panel-header>
 *   <div fd-panel-expand></div>
 *   <h5 fd-panel-title>Panel Header</h5>
 *   <div>Other content</div>
 * </div>
 * ```
 */
@Component({
    // tslint:disable-next-line:component-selector
    selector: '[fd-panel-header]',
    templateUrl: './panel-header.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanelHeaderComponent {
    /** @hidden */
    @HostBinding('class.fd-panel__header')
    readonly fdPanelHeaderClass: boolean = true;

    /** Id of the host element. */
    @Input()
    @HostBinding('attr.id')
    id: string = 'fd-panel-header-' + panelHeaderUniqueId++;
}
