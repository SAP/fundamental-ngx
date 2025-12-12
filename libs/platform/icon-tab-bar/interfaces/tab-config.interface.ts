import { InputSignal, InputSignalWithTransform, Signal, TemplateRef } from '@angular/core';
import { FdkAsyncProperty, Nullable, NullableObject } from '@fundamental-ngx/cdk/utils';
import { IconFont } from '@fundamental-ngx/core/icon';
import { SemanticColor } from '../types';

/** This is config that user should provide to input */
export type TabConfig = NullableObject<{
    icon?: FdkAsyncProperty<string | undefined>;
    label: FdkAsyncProperty<string>;
    color: FdkAsyncProperty<SemanticColor | undefined>;
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
    titleTemplate?: TemplateRef<any>;
    id: string;
    /** ID of the template to use for tab content. When provided, the template with this ID will be used as the tab content.*/
    contentTemplateId?: string;
}>;

export type ReactiveTabConfig = NullableObject<{
    icon?: InputSignal<string | undefined>;
    label: InputSignal<Nullable<string>>;
    color: InputSignal<SemanticColor>;
    counter: InputSignal<Nullable<number>>;
    /** whether the tab is selected */
    active: InputSignalWithTransform<boolean, unknown>;
    /** if set to true, will show red circle in top-right corner of tab */
    badge: InputSignalWithTransform<boolean, unknown>;
    /** config for nested tabs */
    subItems: ReactiveTabConfig[];
    /** Whether the tab can be closed. */
    closable: InputSignalWithTransform<boolean, unknown>;
    iconFont: InputSignal<IconFont>;
    renderer?: Signal<TemplateRef<any> | undefined>;
    titleTemplate?: Signal<TemplateRef<any> | undefined>;
    id: InputSignal<string>;
}>;

export type ExtendedTabConfig = TabConfig & {
    isActive$: Signal<boolean>;
};
