import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
    selector: 'fd-grid-list-item-toolbar',
    templateUrl: './grid-list-item-toolbar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class GridListItemToolbarComponent {
    /** @ignore */
    @ViewChild(TemplateRef)
    contentTemplateRef: TemplateRef<any>;
}
