import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComboboxModule } from '@fundamental-ngx/core/combobox';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { FormItemModule, FormLabelModule } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-combobox-example',
    templateUrl: './combobox-example.component.html',
    styleUrls: ['combobox-example.component.scss'],
    standalone: true,
    imports: [FormItemModule, FormLabelModule, ComboboxModule, FormsModule, ContentDensityDirective]
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
