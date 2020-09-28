import { Component } from '@angular/core';
@Component({
    selector: 'fdp-borderless-display-list-item-example',
    templateUrl: './platform-borderless-display-list-item-example.component.html'
})
export class PlatformDisplayListItemBorderLessExampleComponent {
    items: any[] = [
        { title: 'Item1', secondary: 'Second text', navigationIndicator: true },
        { title: 'Item2', secondary: 'Second text' },
        { title: 'Item3', secondary: 'Second text' },
        { title: 'Item4', secondary: 'Second text', navigationIndicator: true }];

}

