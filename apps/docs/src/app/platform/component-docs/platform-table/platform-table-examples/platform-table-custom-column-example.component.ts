import { Component } from '@angular/core';

const ITEMS = [{
    'name': 'implementation',
    'description': 'sit amet consectetuer adipiscing elit',
    'price': {
        'value': 2.06,
        'currency': 'IDR'
    },
    'status': 'valid',
    'statusColor': 'positive'
}, {
    'name': 'moderator',
    'description': 'luctus et ultrices posuere cubilia curae donec',
    'price': {
        'value': 33.34,
        'currency': 'MZN'
    },
    'status': 'warning',
    'statusColor': 'negative'
}, {
    'name': 'focus group',
    'description': 'at velit vivamus vel nulla eget eros',
    'price': {
        'value': 72.12,
        'currency': 'CNY'
    },
    'status': 'error',
    'statusColor': 'critical'
}, {
    'name': 'contingency',
    'description': 'posuere nonummy integer',
    'price': {
        'value': 6.25,
        'currency': 'CNY'
    },
    'status': 'information',
    'statusColor': 'informative'
}, {
    'name': 'matrix',
    'description': 'congue etiam justo etiam pretium iaculis',
    'price': {
        'value': 54.29,
        'currency': 'NZD'
    },
    'status': 'warning',
    'statusColor': 'negative'
}, {
    'name': 'Persistent',
    'description': 'ipsum praesent blandit',
    'price': {
        'value': 14.59,
        'currency': 'UGX'
    },
    'status': 'information',
    'statusColor': 'informative'
}, {
    'name': 'paradigm',
    'description': 'nec condimentum neque',
    'price': {
        'value': 9.37,
        'currency': 'IDR'
    },
    'status': 'warning',
    'statusColor': 'negative'
}, {
    'name': 'content-based',
    'description': 'non mauris morbi non lectus aliquam',
    'price': {
        'value': 10.17,
        'currency': 'EGP'
    },
    'status': 'error',
    'statusColor': 'critical'
}, {
    'name': 'multimedia',
    'description': 'pede morbi porttitor lorem id ligula',
    'price': {
        'value': 8.06,
        'currency': 'IDR'
    },
    'status': 'information',
    'statusColor': 'informative'
}, {
    'name': 'high-level',
    'description': 'ligula nec sem',
    'price': {
        'value': 27.13,
        'currency': 'EUR'
    },
    'status': 'valid',
    'statusColor': 'positive'
}];

@Component({
    selector: 'fdp-table-custom-column-example',
    templateUrl: './platform-table-custom-column-example.component.html'
})
export class PlatformTableCustomColumnExampleComponent {
    source: any[] = ITEMS;

    onRowSelectionChange(event): void {
        console.log(event);
    }
}
