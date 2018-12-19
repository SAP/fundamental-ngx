import { Component, ContentChild, Input } from '@angular/core';
import { SearchInputComponent } from '../search-input/search-input.component';

@Component({
    selector: 'fd-shellbar-action',
    templateUrl: './shellbar-action.component.html'
})
export class ShellbarActionComponent {

    @Input()
    glyph: string;

    @Input()
    callback: Function;

    @Input()
    label: string;

    @Input()
    notificationLabel: string;

    @Input()
    notificationCount: number;

    @ContentChild(SearchInputComponent)
    searchInputComponent: SearchInputComponent;

}
