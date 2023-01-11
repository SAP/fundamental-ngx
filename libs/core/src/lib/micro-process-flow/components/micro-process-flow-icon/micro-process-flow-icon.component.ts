import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { IconFont } from '@fundamental-ngx/core/icon';
import { Nullable } from '@fundamental-ngx/cdk/utils';

@Component({
    selector: 'fd-micro-process-flow-icon',
    templateUrl: './micro-process-flow-icon.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fd-micro-process-flow__icon-container'
    }
})
export class MicroProcessFlowIconComponent {
    /** The icon name to display. See the icon page for the list of icons
     * here: https://sap.github.io/fundamental-ngx/icon
     */
    @Input() glyph: string;

    /**
     * The icon font
     * Options include: 'SAP-icons', 'BusinessSuiteInAppSymbols' and 'SAP-icons-TNT'
     */
    @Input() font: IconFont = 'SAP-icons';

    /** user's custom classes */
    @Input()
    class: string;

    /** Aria-label for Icon. */
    @Input()
    ariaLabel: Nullable<string>;
}
