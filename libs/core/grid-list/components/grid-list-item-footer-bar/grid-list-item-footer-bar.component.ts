import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
    selector: 'fd-grid-list-item-footer-bar',
    templateUrl: './grid-list-item-footer-bar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class GridListItemFooterBarComponent {
    /** @ignore */
    @ViewChild(TemplateRef)
    contentTemplateRef: TemplateRef<any>;
}
