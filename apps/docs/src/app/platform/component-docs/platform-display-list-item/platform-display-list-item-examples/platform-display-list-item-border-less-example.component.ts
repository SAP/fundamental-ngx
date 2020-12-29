import { Component } from '@angular/core';

export interface Movie {
    title: string;
    secondary: string;
    navigationIndicator: boolean;
    link: string;
}

@Component({
    selector: 'fdp-borderless-display-list-item-example',
    templateUrl: './platform-borderless-display-list-item-example.component.html'
})
export class PlatformDisplayListItemBorderLessExampleComponent {
    items: Movie[] = [
        { title: 'Star War Item Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sapien est, efficitur eu urna quis, sagittis posuere massa. Integer euismod purus ligula, vitae efficitur massa volutpat sit amet. Cras tempor placerat elit, a commodo odio vehicula at.',
         secondary: 'Next session Item Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sapien est, efficitur eu urna quis, sagittis posuere massa. Integer euismod purus ligula, vitae efficitur massa volutpat sit amet. Cras tempor placerat elit, a commodo odio vehicula at.',
          navigationIndicator: true, link: '/platform/home' },
        { title: 'Spide Man', secondary: 'No latest release', navigationIndicator: false, link: '' },
        { title: 'Iron Man', secondary: 'No latest release', navigationIndicator: false, link: '' },
        { title: 'Wonder Women', secondary: 'Next session', navigationIndicator: true, link: '' }];

}

