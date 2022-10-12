import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FieldGroup } from '../../form-helpers';
import { HintOptions } from '@fundamental-ngx/platform/shared';
import { Nullable } from '@fundamental-ngx/core/shared';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fdp-form-group-header]',
    templateUrl: './form-group-header.component.html',
    styles: [
        `
            h1.fd-form-group__header-text {
                display: flex;
                align-items: center;
                justify-content: center;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.fd-form-group__header]': 'true'
    }
})
export class FormGroupHeaderComponent {
    @Input()
    fieldGroup: Nullable<FieldGroup>;

    hintOptions(field: FieldGroup): HintOptions | undefined {
        if (field.hintOptions) {
            return field.hintOptions;
        }
        return;
    }
}
