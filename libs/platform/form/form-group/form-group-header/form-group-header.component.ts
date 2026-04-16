import { NgTemplateOutlet } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
    ViewEncapsulation
} from '@angular/core';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { InlineHelpDirective } from '@fundamental-ngx/core/inline-help';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { FieldGroup } from '../../models/field.model';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fdp-form-group-header]',
    templateUrl: './form-group-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'fd-form-group__header'
    },
    imports: [NgTemplateOutlet, LinkComponent, IconComponent, InlineHelpDirective]
})
export class FormGroupHeaderComponent {
    /** Whether the header should wrap on multiple lines */
    readonly allowWrap = input(false, { transform: booleanAttribute });

    /** Fields Group */
    fieldGroup = input<FieldGroup | null | undefined>(null);

    /** Hint options */
    protected readonly hintOptions = computed(() => this.fieldGroup()?.hintOptions);
}
