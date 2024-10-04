import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DataSourceDirective, MatchingStrategy } from '@fundamental-ngx/cdk/data-source';
import { CvaDirective } from '@fundamental-ngx/cdk/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FormItemComponent, FormLabelComponent } from '@fundamental-ngx/core/form';
import { MultiComboboxComponent, MultiComboboxSelectionChangeEvent } from '@fundamental-ngx/core/multi-combobox';

@Component({
    selector: 'fd-multi-combobox-datasource-example',
    templateUrl: './multi-combobox-datasource-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FormItemComponent,
        FormLabelComponent,
        CvaDirective,
        DataSourceDirective,
        MultiComboboxComponent,
        ButtonComponent,
        JsonPipe,
        ReactiveFormsModule
    ]
})
export class MultiComboboxDatasourceExampleComponent implements OnInit {
    matchingStategy = MatchingStrategy.CONTAINS;
    dataSourceStrings = ['Apple', 'Banana', 'Pineapple', 'Strawberry', 'Broccoli', 'Carrot', 'Jalapeño', 'Spinach'];
    selectedItems1 = [this.dataSourceStrings[1]];
    fb = inject(FormBuilder);
    private cdr = inject(ChangeDetectorRef);
    formGroup = this.fb.group({ multiGroupComboBox: [['']] }, { updateOn: 'blur' });

    ngOnInit(): void {
        this.formGroup.get('multiGroupComboBox')?.setValue(this.selectedItems1);
    }

    onSelect1(item: MultiComboboxSelectionChangeEvent): void {
        this.selectedItems1 = item.selectedItems;
    }

    changeSelectedItems(): void {
        this.selectedItems1 = [this.dataSourceStrings[1], this.dataSourceStrings[2]];
        this.formGroup.get('multiGroupComboBox')?.setValue(this.selectedItems1);
        // this.cdr.detectChanges();
    }
}
