import {
    ChangeDetectionStrategy,
    Component, ContentChild,
    HostBinding,
    Input,
    ViewEncapsulation
} from '@angular/core';
import { ListBylineComponent } from './list-byline.component';

/**
 * The directive that represents a list.
 * It is used to display a list of items with simple information such as scopes, names, etc.
 */
@Component({
    // tslint:disable-next-line:component-selector
    selector: '[fd-list]',
    template: `<ng-content></ng-content>`,
    host: {
        class: 'fd-list',
        '[class.fd-list--byline]': 'isByline'
    },
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {
    /** Whether dropdown mode is included to component, used for Select and Combobox */
    @Input()
    @HostBinding('class.fd-list--dropdown')
    dropdownMode: boolean = false;

    /** Whether multi mode is included to component, used for MultiInput */
    @Input()
    @HostBinding('class.fd-list--multi-input')
    multiInputMode: boolean = false;

    /** Whether compact mode is included to component */
    @Input()
    @HostBinding('class.fd-list--compact')
    compact: boolean = false;

    /** Whether list component contains message */
    @Input()
    @HostBinding('class.fd-list--has-message')
    hasMessage: boolean = false;

    /** Whether list component has removed borders */
    @Input()
    @HostBinding('class.fd-list--no-border')
    noBorder: boolean = false;

    @ContentChild(ListBylineComponent)
    set setBylineListItem(bylineListItem: ListBylineComponent) {
        this.isByline = !!bylineListItem;
    };

    isByline: boolean = false;
}
