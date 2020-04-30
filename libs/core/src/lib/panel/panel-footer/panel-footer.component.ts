import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

/**
 * Panel footer can be utilized for pagination, secondary actions, add more data, etc.
 *
 * ```html
 * <fd-panel>
 *     <fd-panel-footer>
 *         Some text can go here!
 *     </fd-panel-footer>
 * </fd-panel>
 * ```
 */
@Component({
    selector: 'fd-panel-footer',
    templateUrl: './panel-footer.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanelFooterComponent {
    /** @hidden */
    @HostBinding('class.fd-panel__footer')
    fdPanelFooterClass: boolean = true;
}
