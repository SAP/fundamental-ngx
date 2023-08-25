import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { HintOptions } from '@fundamental-ngx/platform/shared';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { FieldGroup } from '../../models/field.model';
import { InlineHelpModule } from '@fundamental-ngx/core/inline-help';
import { IconModule } from '@fundamental-ngx/core/icon';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { NgIf, NgTemplateOutlet } from '@angular/common';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fdp-form-group-header]',
    templateUrl: './form-group-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.fd-form-group__header]': 'true'
    },
    standalone: true,
    imports: [NgIf, NgTemplateOutlet, LinkComponent, IconModule, InlineHelpModule]
})
export class FormGroupHeaderComponent {
    /** Fields Group */
    @Input()
    fieldGroup: Nullable<FieldGroup>;

    /** Hint options */
    get hintOptions(): HintOptions | undefined {
        if (this.fieldGroup?.hintOptions) {
            return this.fieldGroup.hintOptions;
        }

        return;
    }
}
