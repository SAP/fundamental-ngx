import { Component } from '@angular/core';

export const ITEMS = [{
    'name': 'implementation',
    'description': 'sit amet consectetuer adipiscing elit',
    'price': {
        'value': 2.06,
        'currency': 'IDR'
    },
    'status': 'valid'
}, {
    'name': 'moderator',
    'description': 'luctus et ultrices posuere cubilia curae donec',
    'price': {
        'value': 33.34,
        'currency': 'MZN'
    },
    'status': 'warning'
}, {
    'name': 'focus group',
    'description': 'at velit vivamus vel nulla eget eros',
    'price': {
        'value': 72.12,
        'currency': 'CNY'
    },
    'status': 'error'
}, {
    'name': 'contingency',
    'description': 'posuere nonummy integer',
    'price': {
        'value': 6.25,
        'currency': 'CNY'
    },
    'status': 'information'
}, {
    'name': 'matrix',
    'description': 'congue etiam justo etiam pretium iaculis',
    'price': {
        'value': 54.29,
        'currency': 'NZD'
    },
    'status': 'warning'
}, {
    'name': 'Persistent',
    'description': 'ipsum praesent blandit',
    'price': {
        'value': 14.59,
        'currency': 'UGX'
    },
    'status': 'information'
}, {
    'name': 'paradigm',
    'description': 'nec condimentum neque',
    'price': {
        'value': 9.37,
        'currency': 'IDR'
    },
    'status': 'warning'
}, {
    'name': 'content-based',
    'description': 'non mauris morbi non lectus aliquam',
    'price': {
        'value': 10.17,
        'currency': 'EGP'
    },
    'status': 'error'
}, {
    'name': 'multimedia',
    'description': 'pede morbi porttitor lorem id ligula',
    'price': {
        'value': 8.06,
        'currency': 'IDR'
    },
    'status': 'information'
}, {
    'name': 'high-level',
    'description': 'ligula nec sem',
    'price': {
        'value': 27.13,
        'currency': 'EUR'
    },
    'status': 'valid'
}];

@Component({
    selector: 'fdp-table-default-example',
    templateUrl: './platform-table-default-example.component.html'
})
export class PlatformTableDefaultExampleComponent {
    source: any[] = ITEMS;

    onRowSelectionChange(event): void {
        console.log(event);
    }
}
