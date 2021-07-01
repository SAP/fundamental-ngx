import { NestedListModel } from '@fundamental-ngx/core/nested-list';

export interface SideNavigationModel {
    condensed?: boolean;
    mainNavigation: NestedListModel;
    utilityNavigation?: NestedListModel;
}
