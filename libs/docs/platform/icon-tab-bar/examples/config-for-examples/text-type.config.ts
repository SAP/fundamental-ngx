import { TabConfig } from '@fundamental-ngx/platform/icon-tab-bar';

export const textTypeConfig: TabConfig[] = [
    {
        label: 'Item 0',
        counter: 55,
        color: 'critical',
        active: true,
        subItems: null
    },
    {
        label: 'Item 1',
        counter: 96,
        color: null,
        badge: true
    },
    {
        label: 'Item 2',
        counter: 51,
        color: null
    },
    {
        label: 'Item 3',
        counter: 18,
        color: null
    },
    {
        label: 'Item 4',
        counter: 0,
        color: null
    },
    {
        label: 'Item 5',
        counter: 34,
        color: 'critical'
    },
    {
        label: 'Item 6',
        counter: 58,
        color: 'positive'
    },
    {
        label: 'Item 7',
        counter: 15,
        color: null
    },
    {
        label: 'Item 8',
        counter: 76,
        color: null
    },
    {
        label: 'Item 9',
        counter: 59,
        color: null
    }
];

export const longTextTypeConfig: TabConfig[] = [
    ...textTypeConfig,
    {
        label: 'Item 10',
        counter: 70,
        color: 'critical',
        subItems: [
            {
                label: 'Item 0',
                counter: null,
                color: 'critical'
            },
            {
                label: 'Item 1',
                counter: null,
                color: null
            },
            {
                label: 'Item 2',
                counter: null,
                color: null
            }
        ]
    },
    {
        label: 'Item 11',
        counter: 41,
        color: null
    },
    {
        label: 'Item 12',
        counter: 30,
        color: 'positive'
    },
    {
        label: 'Item 13',
        counter: 95,
        color: null
    },
    {
        label: 'Item 14',
        counter: 32,
        color: null
    },
    {
        label: 'Item 15',
        counter: 49,
        color: 'critical'
    },
    {
        label: 'Item 16',
        counter: 41,
        color: null
    },
    {
        label: 'Item 17',
        counter: 66,
        color: null
    }
];
