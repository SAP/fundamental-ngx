import { Component } from '@angular/core';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { FormsModule } from '@angular/forms';
import { ComboboxModule } from '@fundamental-ngx/core/combobox';
import { FormLabelModule } from '@fundamental-ngx/core/form';
import { FormItemModule } from '@fundamental-ngx/core/form';

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
