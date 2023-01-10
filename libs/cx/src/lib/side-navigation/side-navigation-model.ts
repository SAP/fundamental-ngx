import { NestedListModel } from '@fundamental-ngx/cx/nested-list';

export interface SideNavigationModel {
    condensed?: boolean;
    mainNavigation: NestedListModel;
    utilityNavigation?: NestedListModel;
}
