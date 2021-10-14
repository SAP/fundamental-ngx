import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fdp-object-list-item-row',
    template: `
        <div class="fd-object-list__row">
            <div class="fd-object-list__row-left">
                <fdp-object-attribute class="fd-object-list__object-attribute"
                                      [islink]="islink" [label]="attributeLabel"
                                      [linkText]="linkedText">
                    <ng-content select=".attribute"></ng-content>
                </fdp-object-attribute>
            </div>
            <div class="fd-object-list__row-right">
                <ng-content></ng-content>
            </div>
        </div>`,
    styleUrls: ['./object-list-item.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
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
