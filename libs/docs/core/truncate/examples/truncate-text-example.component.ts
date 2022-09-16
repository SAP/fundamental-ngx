import { Component } from '@angular/core';

@Component({
    selector: 'fd-truncate-text-example',
    template: ` <p>{{ text | truncate: 30 }}</p> `
})
export class TruncateTextExampleComponent {
    text =
        'Very very long text very very very very very Long long  very very very very very very very very very very very very very very long';
}
