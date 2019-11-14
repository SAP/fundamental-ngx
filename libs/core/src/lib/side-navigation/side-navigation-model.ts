import { NestedListModel } from '../nested-list/nested-list-model';

export interface SideNavigationModel {
    condensed?: boolean;
    mainNavigation: NestedListModel
    utilityNavigation?: NestedListModel
}
