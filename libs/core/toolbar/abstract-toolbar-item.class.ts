import { OverflowPriority } from '@fundamental-ngx/cdk/utils';

export abstract class ToolbarItem {
    abstract element: HTMLElement;
    abstract isSpacer: boolean;
    abstract width: number;
    abstract priority: OverflowPriority;
    abstract group: number;
}
