import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { InlineHelpDirective } from '@fundamental-ngx/core/inline-help';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { HintOptions } from '@fundamental-ngx/platform/shared';
import { FieldGroup } from '../../models/field.model';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fdp-form-group-header]',
    templateUrl: './form-group-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.fd-form-group__header]': 'true'
    },
    imports: [NgTemplateOutlet, LinkComponent, IconComponent, InlineHelpDirective]
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
