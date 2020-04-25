import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    Optional,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import { FormInputMessageGroupComponent, RtlService } from '@fundamental-ngx/core';

/**
 * This extends core implementation  to support richer extensibility and instead of relying
 * only on ng-content selector this will allow you to put any content as trigger.
 *
 * Let's think of u
 */
@Component({
    selector: 'fdp-input-message-group',
    templateUrl: './input-message-group-with-template.component.html',
    styleUrls: ['./input-message-group-with-template.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputMessageGroupWithTemplate extends FormInputMessageGroupComponent {
    /**
     * Custom trigger element.
     */
    @ContentChild('triggerItem', { static: false })
    triggerItemTemplate: TemplateRef<any>;

    constructor(@Optional() private _rtl: RtlService) {
        super(_rtl);
    }
}
