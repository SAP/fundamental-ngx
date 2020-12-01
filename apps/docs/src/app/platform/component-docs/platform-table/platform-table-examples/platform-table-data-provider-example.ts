import { Observable, of } from 'rxjs';

import {
    CollectionFilter,
    CollectionGroup,
    CollectionSort,
    SortDirection,
    TableDataProvider,
    TableState
} from '@fundamental-ngx/platform';

export class TableDataProviderExample extends TableDataProvider<ExampleItem> {
    items: ExampleItem[] = [];
    totalItems = 0;

    fetch(tableState: TableState): Observable<ExampleItem[]> {
        console.log('TableDataProviderExample – fetch()');
        const {
            sortBy,
            filterBy,
            groupBy,
            currentPage: { pageSize, startIndex }
        } = tableState;

        this.items = [...ITEMS];

        // apply sorting
        if (sortBy?.length) {
            this._sort(sortBy);
        }
        // apply  grouping
        if (groupBy?.length) {
            this._group(groupBy);
        }
        // apply paging
        if (startIndex * pageSize) {
            this._group(groupBy);
        }

        return of(this.items);
    }

    private _sort(sortBy: CollectionSort[]): void {
        console.log('TableDataProviderExample – _sort()');
        const sortCriteria = sortBy[0];

        if (!sortCriteria.field) {
            return;
        }

        const ascModifier: number = sortCriteria.direction === SortDirection.ASC ? 1 : -1;
        this.items.sort((a, b) => sort(a, b, sortCriteria.field) * ascModifier);
    }

    private _group(groupBy: CollectionGroup[]): void {
        console.log('TableDataProviderExample – _group()');
        const groupCriteria = groupBy[0];

        if (!groupCriteria.field) {
            return;
        }

        const ascModifier: number = groupCriteria.direction === SortDirection.ASC ? 1 : -1;
        this.items.sort(
            (a, b) =>
                (getNestedValue(groupCriteria.field, a) > getNestedValue(groupCriteria.field, b) ? 1 : -1) * ascModifier
        );
    }
}

/* UTILS */
const sort = (a, b, key?: string) => {
    if (key) {
        const aValue = getNestedValue(key, a);
        const bValue = getNestedValue(key, b);

        return aValue > bValue ? 1 : -1;
    } else {
        return a > b ? 1 : -1;
    }
};

function getNestedValue(key: string, object: any): any {
    return key.split('.').reduce((a, b) => a[b], object);
}
export interface ExampleItem {
    name: string;
    description: string;
    price: {
        value: number;
        currency: string;
    };
    status: string;
    statusColor?: string;
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
        statusColor: 'informative'
    },
    {
        name: 'Astro Laptop 1516',
        description: 'pede malesuada',
        price: {
            value: 489.01,
            currency: 'EUR'
        },
        status: 'Out of stock',
        statusColor: 'negative'
    },
    {
        name: 'Astro Phone 6',
        description: 'penatibus et magnis',
        price: {
            value: 154.1,
            currency: 'IDR'
        },
        status: 'Stocked on demand',
        statusColor: 'informative'
    },
    {
        name: 'Beam Breaker B-1',
        description: 'fermentum donec ut',
        price: {
            value: 36.56,
            currency: 'NZD'
        },
        status: 'Stocked on demand',
        statusColor: 'informative'
    },
    {
        name: 'Beam Breaker B-2',
        description: 'sapien in sapien iaculis congue',
        price: {
            value: 332.57,
            currency: 'NZD'
        },
        status: 'No info'
    },
    {
        name: 'Benda Laptop 1408',
        description: 'suspendisse potenti cras in',
        price: {
            value: 243.49,
            currency: 'CNY'
        },
        status: 'Stocked on demand',
        statusColor: 'informative'
    },
    {
        name: 'Bending Screen 21HD',
        description: 'nunc nisl duis bibendum',
        price: {
            value: 66.46,
            currency: 'EUR'
        },
        status: 'Available',
        statusColor: 'positive'
    },
    {
        name: 'Blaster Extreme',
        description: 'quisque ut',
        price: {
            value: 436.88,
            currency: 'USD'
        },
        status: 'Available',
        statusColor: 'positive'
    },
    {
        name: 'Broad Screen 22HD',
        description: 'ultrices posuere',
        price: {
            value: 458.18,
            currency: 'CNY'
        },
        status: 'Available',
        statusColor: 'positive'
    },
    {
        name: 'Camcorder View',
        description: 'integer ac leo pellentesque',
        price: {
            value: 300.52,
            currency: 'USD'
        },
        status: 'Available',
        statusColor: 'positive'
    },
    {
        name: 'Cepat Tablet 10.5',
        description: 'rutrum rutrum neque aenean auctor',
        price: {
            value: 365.12,
            currency: 'NZD'
        },
        status: 'No info'
    },
    {
        name: 'Ergo Mousepad',
        description: 'tortor duis mattis egestas',
        price: {
            value: 354.46,
            currency: 'EUR'
        },
        status: 'Stocked on demand',
        statusColor: 'informative'
    },
    {
        name: 'Ergo Screen E-I',
        description: 'massa quis augue luctus tincidunt',
        price: {
            value: 387.23,
            currency: 'NZD'
        },
        status: 'Stocked on demand',
        statusColor: 'informative'
    },
    {
        name: 'Ergo Screen E-II',
        description: 'orci eget',
        price: {
            value: 75.86,
            currency: 'EUR'
        },
        status: 'No info'
    },
    {
        name: 'Gaming Monster',
        description: 'cubilia curae',
        price: {
            value: 152.95,
            currency: 'EGP'
        },
        status: 'No info'
    },
    {
        name: 'Gaming Monster Pro',
        description: 'pharetra magna vestibulum aliquet',
        price: {
            value: 213.47,
            currency: 'MZN'
        },
        status: 'Out of stock',
        statusColor: 'negative'
    },
    {
        name: 'ITelO Vault',
        description: 'nisl duis',
        price: {
            value: 33.0,
            currency: 'EGP'
        },
        status: 'Become out of stock',
        statusColor: 'critical'
    },
    {
        name: 'ITelO Vault Net',
        description: 'ut odio',
        price: {
            value: 353.29,
            currency: 'EUR'
        },
        status: 'Available',
        statusColor: 'positive'
    },
    {
        name: 'Multi Color',
        description: 'cras mi pede malesuada',
        price: {
            value: 98.08,
            currency: 'MZN'
        },
        status: 'Become out of stock',
        statusColor: 'critical'
    },
    {
        name: 'Multi Print',
        description: 'ac diam cras pellentesque',
        price: {
            value: 169.13,
            currency: 'IDR'
        },
        status: 'Available',
        statusColor: 'positive'
    },
    {
        name: 'Mini Tablet',
        description: 'condimentum neque',
        price: {
            value: 196.52,
            currency: 'EGP'
        },
        status: 'Out of stock',
        statusColor: 'negative'
    },
    {
        name: 'Proctra X',
        description: 'augue vestibulum ante ipsum primis',
        price: {
            value: 275.65,
            currency: 'USD'
        },
        status: 'Available',
        statusColor: 'positive'
    },
    {
        name: 'Server Professional',
        description: 'porttitor lorem',
        price: {
            value: 456.5,
            currency: 'EGP'
        },
        status: 'Stocked on demand',
        statusColor: 'informative'
    },
    {
        name: 'Ultra Jet Super Color',
        description: 'tristique tortor',
        price: {
            value: 302.18,
            currency: 'EUR'
        },
        status: 'Stocked on demand',
        statusColor: 'informative'
    },
    {
        name: 'Ultra Jet Mobile',
        description: 'est congue elementum in hac',
        price: {
            value: 226.91,
            currency: 'NZD'
        },
        status: 'Available',
        statusColor: 'positive'
    },
    {
        name: 'Wireless DSL Router',
        description: 'ultrices aliquet maecenas leo odio',
        price: {
            value: 192.78,
            currency: 'USD'
        },
        status: 'Become out of stock',
        statusColor: 'critical'
    },
    {
        name: '10 Portable DVD player',
        description: 'cursus vestibulum proin',
        price: {
            value: 43.41,
            currency: 'EUR'
        },
        status: 'Out of stock',
        statusColor: 'negative'
    },
    {
        name: 'Astro Laptop 1516',
        description: 'justo sollicitudin ut',
        price: {
            value: 311.68,
            currency: 'MZN'
        },
        status: 'Become out of stock',
        statusColor: 'critical'
    },
    {
        name: 'Astro Phone 6',
        description: 'eget massa tempor convallis',
        price: {
            value: 326.64,
            currency: 'MZN'
        },
        status: 'Stocked on demand',
        statusColor: 'informative'
    },
    {
        name: 'Beam Breaker B-1',
        description: 'vestibulum sit',
        price: {
            value: 286.95,
            currency: 'IDR'
        },
        status: 'Available',
        statusColor: 'positive'
    }
];
