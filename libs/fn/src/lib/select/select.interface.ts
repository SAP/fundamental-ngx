import { QueryList } from '@angular/core';

export interface Select {
    hideMenu: () => void;
    setMenu: (menu: any) => void;
    options: QueryList<any>;
    optionClicked: (option: any) => void;
    editable: boolean;
}
