import { Component } from '@angular/core';

@Component({
    selector: 'fd-multi-input-filter-example',
    templateUrl: './multi-input-filter-example.component.html'
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
