import { Component } from '@angular/core';

export interface Name {
    title: string;
}

@Component({
    selector: 'fdp-platform-list-with-footer-example',
    templateUrl: './platform-list-with-footer-example.component.html'
})
export class PlatformListWithFooterExampleComponent {
    items: Name[] = [{ title: 'Item1' }, { title: 'Item2' }, { title: 'Item3' }];
}
