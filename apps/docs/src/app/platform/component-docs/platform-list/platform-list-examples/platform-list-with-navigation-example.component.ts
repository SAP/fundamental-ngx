import { Component } from '@angular/core';

export interface Name {
    title: string;
}

@Component({
    selector: 'fdp-platform-list-with-navigation-example',
    templateUrl: './platform-list-with-navigation-example.component.html'
})
export class PlatformListWithNavigationExampleComponent {
    items: Name[] = [{ title: 'Item1' }, { title: 'Item2' }, { title: 'Item3' }];
}
