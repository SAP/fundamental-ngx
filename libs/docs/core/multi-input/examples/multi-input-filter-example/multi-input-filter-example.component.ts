import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MultiInputModule } from '@fundamental-ngx/core/multi-input';

@Component({
    selector: 'fd-multi-input-filter-example',
    templateUrl: './multi-input-filter-example.component.html',
    standalone: true,
    imports: [MultiInputModule, FormsModule, JsonPipe]
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
