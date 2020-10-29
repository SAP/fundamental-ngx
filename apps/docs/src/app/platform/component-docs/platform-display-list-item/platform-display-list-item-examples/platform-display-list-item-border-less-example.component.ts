import { Component } from '@angular/core';

export interface Movie {
    title: string;
    secondary: string;
    navigationIndicator: boolean;
}

@Component({
    selector: 'fdp-borderless-display-list-item-example',
    templateUrl: './platform-borderless-display-list-item-example.component.html'
})
export class PlatformDisplayListItemBorderLessExampleComponent {
    items: Movie[] = [
        { title: 'Star War', secondary: 'Next session', navigationIndicator: true },
        { title: 'Spide Man', secondary: 'No latest release', navigationIndicator: false },
        { title: 'Iron Man', secondary: 'No latest release', navigationIndicator: false },
        { title: 'Wonder Women', secondary: 'Next session', navigationIndicator: true }];

}

