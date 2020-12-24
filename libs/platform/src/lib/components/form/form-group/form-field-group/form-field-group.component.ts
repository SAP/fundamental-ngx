import {
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    Input,
    OnInit, QueryList,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { FormFieldComponent, FormGroupContainer } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-form-field-group',
    templateUrl: './form-field-group.component.html',
    styleUrls: ['./form-field-group.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldGroupComponent implements OnInit {
    @Input()
    label: string;

    @ViewChild('renderer', { read: TemplateRef })
    renderer: TemplateRef<any>;

    @ContentChildren(FormFieldComponent) fields: QueryList<any>;

    constructor(
        readonly formGroupContainer: FormGroupContainer
    ) {
    }

    ngOnInit(): void {
        this.addFormFieldGroup();
    }

    addFormFieldGroup(): void {
        this.formGroupContainer.addFormField(this);
    }
 }
