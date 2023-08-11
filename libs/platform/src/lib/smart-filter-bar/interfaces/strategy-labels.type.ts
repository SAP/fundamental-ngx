import { FILTER_STRATEGY } from '@fundamental-ngx/platform/table';

export type SmartFilterBarStrategyLabels = {
    [key in (typeof FILTER_STRATEGY)[keyof typeof FILTER_STRATEGY]]: string;
};
