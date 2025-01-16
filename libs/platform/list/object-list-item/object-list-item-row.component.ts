import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { ObjectAttributeComponent } from '@fundamental-ngx/core/object-attribute';

@Component({
    selector: 'fdp-object-list-item-row',
    template: ` <div class="fd-object-list__row">
        <div class="fd-object-list__row-left">
            <fd-object-attribute
                class="fd-object-list__object-attribute"
                [islink]="islink"
                [label]="attributeLabel"
                [linkText]="linkedText"
            >
                <ng-content select=".attribute"></ng-content>
            </fd-object-attribute>
        </div>
        <div class="fd-object-list__row-right">
            <ng-content></ng-content>
        </div>
    </div>`,
    styleUrl: './object-list-item.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ObjectAttributeComponent]
})
export class ObjectListItemRowComponent {
    /** object attribute label */
    @Input()
    attributeLabel: string;

    /** object attribute link text */
    @Input()
    linkedText: string;

    /** object attribute is a link */
    @Input()
    islink = false;
}
