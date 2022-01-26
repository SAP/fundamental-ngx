import { Component } from '@angular/core';
import { Product } from './platform-object-list-item-with-row-selection-example.component';
@Component({
    selector: 'fdp-platform-object-list-item-border-less-example',
    templateUrl: './platform-object-list-item-border-less-example.component.html'
})
export class PlatformObjectListItemBorderLessExampleComponent {
    items: Product[] = [
        {
            title: 'Webcam',
            introductionText: 'First product with discount',
            currency: 'Euro',
            amount: 817.5,
            image: 'http://picsum.photos/id/1018/400',
            gylp1: 'add-favorite',
            tip1: 'favorite',
            tip2: 'edit',
            gylp2: 'user-edit',
            attribute1: '345kg',
            attribute2: '155 x 140 cm',
            attribute3: '145 x 140 x 360 cm',
            status1: 'critical',
            statusgyph1: 'status-critical',
            statuslabel1: 'Critical',
            inverted1: false,
            status2: 'informative',
            statusgyph2: 'hint',
            statuslabel2: 'Informative',
            inverted2: true,
            decimal: 2
        },
        {
            title: 'Power Projector 4713',
            introductionText: '',
            currency: 'Euro',
            amount: 871.5,
            image: 'http://picsum.photos/id/1018/400',
            gylp1: 'add-favorite',
            gylp2: 'flag',
            tip1: 'favorite',
            tip2: 'flag',
            attribute3: '',
            attribute2: '125 g',
            attribute1: '145 x 140 x 360 cm',
            status1: undefined,
            statusgyph1: 'to-be-reviewed',
            statuslabel1: 'Default',
            inverted1: true,
            status2: undefined,
            statusgyph2: '',
            statuslabel2: '',
            inverted2: false,
            decimal: 2
        },
        {
            title:
                'Apple Macintosh Performa/Power Macintosh 5200' +
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
                'Cras sapien est, efficitur eu urna quis, sagittis posuere massa.' +
                ' Integer euismod purus ligula, vitae efficitur massa volutpat sit amet.' +
                '  Cras tempor placerat elit, a commodo odio vehicula at.' +
                'Macintosh Performa Power Macintosh 24/5200',
            introductionText:
                'Product with' +
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
                'Cras sapien est, efficitur eu urna quis, sagittis posuere massa.' +
                ' Integer euismod purus ligula, vitae efficitur massa volutpat sit amet.' +
                '  Cras tempor placerat elit, a commodo odio vehicula at.' +
                'Macintosh Performa Power Macintosh 24/5200',
            currency: 'Euro',
            amount: 27.5,
            image: 'http://picsum.photos/id/1018/400',
            gylp1: 'request',
            gylp2: 'private',
            tip1: 'request',
            tip2: 'private',
            attribute2: '',
            attribute1: '125 g',
            attribute3: '145 x 140 x 360 cm',
            status1: 'positive',
            statusgyph1: '',
            statuslabel1: 'Positive',
            inverted1: false,
            status2: 'negative',
            statusgyph2: 'status-negative',
            statuslabel2: 'Negative',
            inverted2: true,
            decimal: 2
        },
        {
            title: 'Hurricane GX',
            introductionText: 'resale product',
            currency: 'Euro',
            amount: 487.5,
            image: 'http://picsum.photos/id/1018/400',
            gylp1: 'private',
            gylp2: 'flag',
            tip1: 'private',
            tip2: 'flag',
            attribute1: '125.43 kg',
            attribute2: '125 g',
            attribute3: '145 x 140 x 360 cm',
            status2: 'critical',
            statusgyph2: 'status-critical',
            statuslabel2: 'Critical',
            inverted2: false,
            status1: 'informative',
            statusgyph1: 'hint',
            statuslabel1: 'Informative',
            inverted1: false,
            decimal: 2
        }
    ];
}
