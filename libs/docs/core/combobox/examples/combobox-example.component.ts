import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComboboxComponent } from '@fundamental-ngx/core/combobox';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { FormItemComponent, FormLabelComponent } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-combobox-example',
    templateUrl: './combobox-example.component.html',
    styleUrls: ['combobox-example.component.scss'],
    imports: [FormItemComponent, FormLabelComponent, ComboboxComponent, FormsModule, ContentDensityDirective]
})
export class ComboboxExampleComponent {
    searchTermOne = '';
    searchTermTwo = '';
    searchTermThree = '';
    searchTermFour = '';
    searchTermFive = 'Kiwi';
    searchTermSix = '';
    fruits = ['Apple', 'Pineapple', 'Banana', 'Kiwi', 'Strawberry'];
}
