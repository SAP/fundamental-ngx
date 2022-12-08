import { TabConfig } from '@fundamental-ngx/platform/icon-tab-bar';

export const iconTypeConfig: TabConfig[] = [
    {
        icon: 'accelerated',
        label: 'Item 0',
        counter: 55,
        color: 'critical',
        active: true
    },
    {
        icon: 'action',
        label: 'Item 1',
        counter: 96,
        color: null,
        badge: true
    },
    {
        icon: 'account',
        label: 'Item 2',
        counter: 51,
        color: null
    },
    {
        icon: 'alert',
        label: 'Item 3',
        counter: 18,
        color: null
    },
    {
        icon: 'addresses',
        label: 'Item 4',
        counter: 0,
        color: null
    },
    {
        icon: 'appointment',
        label: 'Item 5',
        counter: 34,
        color: 'critical'
    },
    {
        icon: 'arobase',
        label: 'Item 6',
        counter: 58,
        color: 'positive'
    },
    {
        icon: 'basket',
        label: 'Item 7',
        counter: 15,
        color: null
    },
    {
        icon: 'background',
        label: 'Item 8',
        counter: 76,
        color: null
    },
    {
        icon: 'begin',
        label: 'Item 9',
        counter: 59,
        color: null
    }
];

export const longIconTypeConfig: TabConfig[] = [
    ...iconTypeConfig,
    {
        icon: 'bell',
        label: 'Item 10',
        counter: 70,
        color: 'critical'
    },
    {
        icon: 'bookmark',
        label: 'Item 11',
        counter: 41,
        color: null
    },
    {
        icon: 'calendar',
        label: 'Item 12',
        counter: 30,
        color: 'positive'
    },
    {
        icon: 'card',
        label: 'Item 13',
        counter: 95,
        color: null
    },
    {
        icon: 'cancel',
        label: 'Item 14',
        counter: 32,
        color: null
    },
    {
        icon: 'camera',
        label: 'Item 15',
        counter: 49,
        color: 'critical'
    },
    {
        icon: 'cart',
        label: 'Item 16',
        counter: 41,
        color: null
    },
    {
        icon: 'chalkboard',
        label: 'Item 17',
        counter: 66,
        color: null
    }
];
