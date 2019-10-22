import { Component } from '@angular/core';

@Component({
    selector: 'fd-multi-input-filter-example',
    templateUrl: './multi-input-filter-example.component.html',
})
export class MultiInputFilterExampleComponent {

    selected = [];

    customFilter(content: any[], searchTerm: string): any[] {
        const search = searchTerm.toLocaleLowerCase();
        return content.filter(item =>
            item.toLocaleLowerCase().startsWith(search)
        );
    }
}
