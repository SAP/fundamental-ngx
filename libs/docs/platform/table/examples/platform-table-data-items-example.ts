import { FdDate } from '@fundamental-ngx/core/datetime';

export interface ExampleItem {
    name: string;
    description: string;
    price: {
        value: number;
        currency: string;
    };
    status: string;
    statusColor?: string;
    date: FdDate;
    verified: boolean;
    semantic?: string;
}

// Example items
export const ITEMS: ExampleItem[] = [
    {
        name: '10 Portable DVD player',
        description: 'diam neque vestibulum eget vulputate',
        price: {
            value: 66.04,
            currency: 'CNY'
        },
        status: 'Stocked on demand',
        statusColor: 'informative',
        date: new FdDate(2020, 1, 7),
        verified: true,
        semantic: 'valid'
    },
    {
        name: 'Astro Laptop 1516',
        description: 'pede malesuada',
        price: {
            value: 489.01,
            currency: 'EUR'
        },
        status: 'Out of stock',
        statusColor: 'negative',
        date: new FdDate(2020, 2, 5),
        verified: true
    },
    {
        name: 'Astro Phone 6',
        description: 'penatibus et magnis',
        price: {
            value: 154.1,
            currency: 'IDR'
        },
        status: 'Stocked on demand',
        statusColor: 'informative',
        date: new FdDate(2020, 1, 12),
        verified: true,
        semantic: 'warning'
    },
    {
        name: 'Beam Breaker B-1',
        description: 'fermentum donec ut',
        price: {
            value: 36.56,
            currency: 'NZD'
        },
        status: 'Stocked on demand',
        statusColor: 'informative',
        date: new FdDate(2020, 11, 24),
        verified: false
    },
    {
        name: 'Beam Breaker B-2',
        description: 'sapien in sapien iaculis congue',
        price: {
            value: 332.57,
            currency: 'NZD'
        },
        status: 'No info',
        date: new FdDate(2020, 10, 23),
        verified: true,
        semantic: 'information'
    },
    {
        name: 'Benda Laptop 1408',
        description: 'suspendisse potenti cras in',
        price: {
            value: 243.49,
            currency: 'CNY'
        },
        status: 'Stocked on demand',
        statusColor: 'informative',
        date: new FdDate(2020, 9, 22),
        verified: true
    },
    {
        name: 'Bending Screen 21HD',
        description: 'nunc nisl duis bibendum',
        price: {
            value: 66.46,
            currency: 'EUR'
        },
        status: 'Available',
        statusColor: 'positive',
        date: new FdDate(2020, 8, 14),
        verified: false,
        semantic: 'error'
    },
    {
        name: 'Blaster Extreme',
        description: 'quisque ut',
        price: {
            value: 436.88,
            currency: 'USD'
        },
        status: 'Available',
        statusColor: 'positive',
        date: new FdDate(2020, 8, 15),
        verified: true
    },
    {
        name: 'Broad Screen 22HD',
        description: 'ultrices posuere',
        price: {
            value: 458.18,
            currency: 'CNY'
        },
        status: 'Available',
        statusColor: 'positive',
        date: new FdDate(2020, 5, 4),
        verified: true,
        semantic: 'valid'
    },
    {
        name: 'Camcorder View',
        description: 'integer ac leo pellentesque',
        price: {
            value: 300.52,
            currency: 'USD'
        },
        status: 'Available',
        statusColor: 'positive',
        date: new FdDate(2020, 5, 5),
        verified: true
    },
    {
        name: 'Cepat Tablet 10.5',
        description: 'rutrum rutrum neque aenean auctor',
        price: {
            value: 365.12,
            currency: 'NZD'
        },
        status: 'No info',
        date: new FdDate(2020, 5, 6),
        verified: true,
        semantic: 'warning'
    },
    {
        name: 'Ergo Mousepad',
        description: 'tortor duis mattis egestas',
        price: {
            value: 354.46,
            currency: 'EUR'
        },
        status: 'Stocked on demand',
        statusColor: 'informative',
        date: new FdDate(2020, 5, 7),
        verified: true
    },
    {
        name: 'Ergo Screen E-I',
        description: 'massa quis augue luctus tincidunt',
        price: {
            value: 387.23,
            currency: 'NZD'
        },
        status: 'Stocked on demand',
        statusColor: 'informative',
        date: new FdDate(2020, 3, 23),
        verified: true,
        semantic: 'information'
    },
    {
        name: 'Ergo Screen E-II',
        description: 'orci eget',
        price: {
            value: 75.86,
            currency: 'EUR'
        },
        status: 'No info',
        date: new FdDate(2020, 3, 20),
        verified: false
    },
    {
        name: 'Gaming Monster',
        description: 'cubilia curae',
        price: {
            value: 152.95,
            currency: 'EGP'
        },
        status: 'No info',
        date: new FdDate(2020, 9, 20),
        verified: false,
        semantic: 'error'
    },
    {
        name: 'Gaming Monster Pro',
        description: 'pharetra magna vestibulum aliquet',
        price: {
            value: 213.47,
            currency: 'MZN'
        },
        status: 'Out of stock',
        statusColor: 'negative',
        date: new FdDate(2020, 4, 17),
        verified: false
    },
    {
        name: 'ITelO Vault',
        description: 'nisl duis',
        price: {
            value: 33.0,
            currency: 'EGP'
        },
        status: 'Become out of stock',
        statusColor: 'critical',
        date: new FdDate(2020, 4, 17),
        verified: false
    },
    {
        name: 'ITelO Vault Net',
        description: 'ut odio',
        price: {
            value: 353.29,
            currency: 'EUR'
        },
        status: 'Available',
        statusColor: 'positive',
        date: new FdDate(2020, 10, 23),
        verified: true
    },
    {
        name: 'Multi Color',
        description: 'cras mi pede malesuada',
        price: {
            value: 98.08,
            currency: 'MZN'
        },
        status: 'Become out of stock',
        statusColor: 'critical',
        date: new FdDate(2019, 8, 12),
        verified: false
    },
    {
        name: 'Multi Print',
        description: 'ac diam cras pellentesque',
        price: {
            value: 169.13,
            currency: 'IDR'
        },
        status: 'Available',
        statusColor: 'positive',
        date: new FdDate(2018, 5, 26),
        verified: true
    },
    {
        name: 'Mini Tablet',
        description: 'condimentum neque',
        price: {
            value: 196.52,
            currency: 'EGP'
        },
        status: 'Out of stock',
        statusColor: 'negative',
        date: new FdDate(2019, 12, 30),
        verified: true
    },
    {
        name: 'Proctra X',
        description: 'augue vestibulum ante ipsum primis',
        price: {
            value: 275.65,
            currency: 'USD'
        },
        status: 'Available',
        statusColor: 'positive',
        date: new FdDate(2019, 2, 7),
        verified: true
    },
    {
        name: 'Server Professional',
        description: 'porttitor lorem',
        price: {
            value: 456.5,
            currency: 'EGP'
        },
        status: 'Stocked on demand',
        statusColor: 'informative',
        date: new FdDate(2020, 11, 27),
        verified: false
    },
    {
        name: 'Ultra Jet Super Color',
        description: 'tristique tortor',
        price: {
            value: 302.18,
            currency: 'EUR'
        },
        status: 'Stocked on demand',
        statusColor: 'informative',
        date: new FdDate(2020, 10, 10),
        verified: false
    },
    {
        name: 'Ultra Jet Mobile',
        description: 'est congue elementum in hac',
        price: {
            value: 226.91,
            currency: 'NZD'
        },
        status: 'Available',
        statusColor: 'positive',
        date: new FdDate(2020, 10, 13),
        verified: false
    },
    {
        name: 'Wireless DSL Router',
        description: 'ultrices aliquet maecenas leo odio',
        price: {
            value: 192.78,
            currency: 'USD'
        },
        status: 'Become out of stock',
        statusColor: 'critical',
        date: new FdDate(2020, 9, 16),
        verified: false
    },
    {
        name: '10 Portable DVD player',
        description: 'cursus vestibulum proin',
        price: {
            value: 43.41,
            currency: 'EUR'
        },
        status: 'Out of stock',
        statusColor: 'negative',
        date: new FdDate(2020, 9, 12),
        verified: true
    },
    {
        name: 'Astro Laptop 1516',
        description: 'justo sollicitudin ut',
        price: {
            value: 311.68,
            currency: 'MZN'
        },
        status: 'Become out of stock',
        statusColor: 'critical',
        date: new FdDate(2020, 7, 30),
        verified: true
    },
    {
        name: 'Astro Phone 6',
        description: 'eget massa tempor convallis',
        price: {
            value: 326.64,
            currency: 'MZN'
        },
        status: 'Stocked on demand',
        statusColor: 'informative',
        date: new FdDate(2020, 9, 28),
        verified: false
    },
    {
        name: 'Beam Breaker B-1',
        description: 'vestibulum sit',
        price: {
            value: 286.95,
            currency: 'IDR'
        },
        status: 'Available',
        statusColor: 'positive',
        date: new FdDate(2020, 6, 17),
        verified: false
    }
];
