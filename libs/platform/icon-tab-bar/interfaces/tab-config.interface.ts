import { Signal, TemplateRef } from '@angular/core';
import { FdkAsyncProperty, NullableObject } from '@fundamental-ngx/cdk/utils';
import { IconFont } from '@fundamental-ngx/core/icon';
import { SemanticColor } from '../types';

/** This is config that user should provide to input */
export type TabConfig = NullableObject<{
    icon: FdkAsyncProperty<string>;
    label: FdkAsyncProperty<string>;
    color: FdkAsyncProperty<SemanticColor>;
    counter: FdkAsyncProperty<number>;
    /** whether the tab is selected */
    active: boolean;
    /** if set to true, will show red circle in top-right corner of tab */
    badge: boolean;
    /** config for nested tabs */
    subItems: TabConfig[];
    /** Whether the tab can be closed. */
    closable: boolean;
    iconFont: IconFont;
    renderer?: TemplateRef<any>;
    id?: string;
}>;

export type ExtendedTabConfig = TabConfig & {
    isActive$: Signal<boolean>;
};
