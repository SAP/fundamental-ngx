import { NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
    BarComponent,
    BarElementDirective,
    BarLeftDirective,
    BarMiddleDirective,
    BarRightDirective
} from '@fundamental-ngx/core/bar';
import { PopoverBodyHeaderDirective } from '@fundamental-ngx/core/popover';

@Component({
    selector: 'fd-quick-view-title',
    templateUrl: './quick-view-title.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        PopoverBodyHeaderDirective,
        BarComponent,
        NgSwitch,
        NgSwitchCase,
        BarLeftDirective,
        NgTemplateOutlet,
        BarRightDirective,
        NgSwitchDefault,
        BarMiddleDirective,
        BarElementDirective
    ]
})
export class QuickViewTitleComponent {
    /**
     * Alignment of title.
     * Options include 'left', 'right' and 'middle'. The default is set to 'middle'.
     * */
    @Input() align: 'left' | 'right' | 'middle' = 'middle';
}
