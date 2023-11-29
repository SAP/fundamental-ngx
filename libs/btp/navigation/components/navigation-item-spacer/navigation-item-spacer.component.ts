import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fdb-navigation-item-spacer',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './navigation-item-spacer.component.html',
    encapsulation: ViewEncapsulation.None
})
export class NavigationItemSpacerComponent {}
