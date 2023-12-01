import { Subject } from 'rxjs';

export interface TabListComponentInterface {
    tabPanelPropertyChanged: Subject<void>;
}
