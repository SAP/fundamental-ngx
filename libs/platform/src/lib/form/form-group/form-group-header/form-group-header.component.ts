import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FieldGroup } from '../../form-helpers';
import { HintOptions } from '@fundamental-ngx/platform/shared';
import { Nullable } from '@fundamental-ngx/core/shared';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fdp-form-group-header]',
    templateUrl: './form-group-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.fd-form-group__header]': 'true'
    }
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
