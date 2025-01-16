import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiInputComponent } from '@fundamental-ngx/core/multi-input';

@Component({
    selector: 'fd-multi-input-filter-example',
    templateUrl: './multi-input-filter-example.component.html',
    imports: [MultiInputComponent, FormsModule, JsonPipe]
})
export class MultiInputFilterExampleComponent {
    selected = [];

    customFilter(content: any[], searchTerm: string = ''): any[] {
        if (!searchTerm) {
            return content;
        }
        return content.filter((item) => item.startsWith(searchTerm));
    }
}
