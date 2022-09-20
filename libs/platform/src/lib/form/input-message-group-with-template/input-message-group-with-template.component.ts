import { ChangeDetectionStrategy, Component, ContentChild, TemplateRef, ViewEncapsulation } from '@angular/core';

import { skeletonConsumerProviders } from '@fundamental-ngx/core/skeleton';
import { FormInputMessageGroupComponent } from '@fundamental-ngx/core/form';

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
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: skeletonConsumerProviders()
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class InputMessageGroupWithTemplate extends FormInputMessageGroupComponent {
    /**
     * Custom trigger element.
     */
    @ContentChild('triggerItem', { static: false })
    triggerItemTemplate: TemplateRef<any>;
}
