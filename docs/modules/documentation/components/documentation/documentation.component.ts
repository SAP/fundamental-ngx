import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'documentation',
    styleUrls: ['./documentation.component.scss'],
    templateUrl: './documentation.component.html'
})
export class DocumentationComponent {
    components: any = [
        { url: 'action-bar', name: 'Action Bar' },
        { url: 'alert', name: 'Alert' },
        { url: 'badgeLabel', name: 'Badge and Label' },
        { url: 'breadcrumb', name: 'Breadcrumb' },
        { url: 'button', name: 'Button' },
        { url: 'buttonGroup', name: 'Button Group' },
        { url: 'dropdown', name: 'Dropdown' },
        { url: 'icon', name: 'Icon' },
        { url: 'identifier', name: 'Identifier' },
        { url: 'inlineHelp', name: 'Inline Help' },
        { url: 'image', name: 'Image' },
        { url: 'inputGroup', name: 'Input Group' },
        { url: 'list', name: 'List' },
        { url: 'megaMenu', name: 'Mega Menu' },
        { url: 'modal', name: 'Modal' },
        { url: 'pagination', name: 'Pagination' },
        { url: 'panel', name: 'Panel' },
        { url: 'sideNavigation', name: 'Side Navigation' },
        { url: 'table', name: 'Table' },
        { url: 'tabs', name: 'Tabs' },
        { url: 'tile', name: 'Tile' },
        { url: 'tree', name: 'Tree' }
    ];

    constructor(private router: Router) {}

    selectComponent(component: string) {
        this.router.navigate(['/docs', component]);
    }
}
