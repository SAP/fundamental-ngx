import {
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    Input,
    OnInit,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { FormField } from '../../form-field';
import { FormGroupContainer} from '../../form-group';

@Component({
    selector: 'fdp-form-field-group',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./form-field-group.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class FormFieldGroupComponent implements OnInit {
    @Input()
    label: string;

    @ViewChild('renderer', { read: TemplateRef })
    renderer: TemplateRef<any>;

    @ContentChildren(FormField) groupFields: QueryList<any>;

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
