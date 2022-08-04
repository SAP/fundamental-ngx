import { QueryList } from '@angular/core';
import { OptionComponent } from './option/option.component';
import { SelectMenuDirective } from './select-menu.directive';

export interface Select {
    hideMenu: () => void;
    setMenu: (menu: SelectMenuDirective) => void;
    options: QueryList<OptionComponent>;
    optionClicked: (option: OptionComponent) => void;
}
