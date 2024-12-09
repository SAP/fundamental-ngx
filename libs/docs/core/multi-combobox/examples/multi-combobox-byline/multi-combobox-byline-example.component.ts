import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { TemplateDirective } from '@fundamental-ngx/cdk/utils';
import { FormItemComponent, FormLabelComponent } from '@fundamental-ngx/core/form';
import { ListBylineDirective, ListContentDirective, ListTitleDirective } from '@fundamental-ngx/core/list';
import { MultiComboboxComponent } from '@fundamental-ngx/core/multi-combobox';

@Component({
    selector: 'fd-multi-combobox-byline-example',
    imports: [
        FormItemComponent,
        FormLabelComponent,
        MultiComboboxComponent,
        ListContentDirective,
        ListTitleDirective,
        ListBylineDirective,
        TemplateDirective
    ],
    templateUrl: './multi-combobox-byline-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiComboboxBylineExampleComponent {
    dataSource = [
        { id: '1', name: 'Some long text to display wraping lines capability', type: 'Fruits' },
        { id: '2', name: 'Pineapple', type: 'Fruits' },
        { id: '3', name: 'Strawberry', type: 'Fruits' },
        { id: '4', name: 'Broccoli', type: 'Vegetables' },
        { id: '5', name: 'Carrot', type: 'Vegetables' },
        { id: '6', name: 'Jalapeño', type: 'Vegetables' },
        { id: '7', name: 'Spinach', type: 'Vegetables' },
        { id: '8', name: 'Ukraine', type: 'Countries' },
        { id: '9', name: 'Georgia', type: 'Countries' },
        { id: '10', name: 'Poland', type: 'Countries' },
        { id: '11', name: 'Finland', type: 'Countries' },
        { id: '12', name: 'Denmark', type: 'Countries' },
        { id: '13', name: 'Sweden', type: 'Countries' },
        { id: '14', name: 'Lietuva', type: 'Countries' },
        { id: '15', name: 'Latvia', type: 'Countries' },
        { id: '16', name: 'Spain', type: 'Countries' },
        { id: '17', name: 'Switzerland', type: 'Countries' },
        { id: '18', name: 'USA', type: 'Countries' },
        { id: '19', name: 'Turkey', type: 'Countries' },
        { id: '20', name: 'Italy', type: 'Countries' },
        { id: '21', name: 'Azerbaijan', type: 'Countries' },
        { id: '22', name: 'Germany', type: 'Countries' },
        { id: '23', name: 'Audi', type: 'Cars' },
        { id: '24', name: 'Mercedes', type: 'Cars' },
        { id: '25', name: 'Tesla', type: 'Cars' },
        { id: '26', name: 'Porsche', type: 'Cars' },
        { id: '27', name: 'Toyota', type: 'Cars' },
        { id: '28', name: 'Ford', type: 'Cars' }
    ];
    selectedItems2 = [this.dataSource[1]];
}
