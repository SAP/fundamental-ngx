import { Component } from '@angular/core';
import { Product } from './platform-object-list-item-with-row-selection-example.component';
@Component({
    selector: 'fdp-borderless-object-list-item-example',
    templateUrl: './platform-borderless-object-list-item-example.component.html'
})
export class PlatformObjectListItemBorderLessExampleComponent {
    items: Product[] = [
        {
            title: 'Webcam',
            introductionText: 'First product with discount',
            currency: 'Euro',
            amount: 817.50,
            image: 'http://picsum.photos/id/1018/400',
            gylp1: 'add-favorite',
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
            amount: 871.50,
            image: 'http://picsum.photos/id/1018/400',
            gylp1: 'add-favorite',
            gylp2: 'flag',
            attribute3: '',
            attribute2: '125 g',
            attribute1: '145 x 140 x 360 cm',
            status1: '',
            statusgyph1: 'to-be-reviewed',
            statuslabel1: 'Default',
            inverted1: true,
            status2: '',
            statusgyph2: '',
            statuslabel2: '',
            inverted2: false,
            decimal: 2
        },
        {
            title: 'Gladiator MX',
            introductionText: 'Gladiator product with discount',
            currency: 'Euro',
            amount: 27.50,
            image: 'http://picsum.photos/id/1018/400',
            gylp1: 'request',
            gylp2: 'private',
            attribute2: '',
            attribute1: '125 g',
            attribute3: '145 x 140 x 360 cm',
            status1: 'positive',
            statusgyph1: '',
            statuslabel1: 'Positive',
            inverted1: false,
            status2: 'negative',
            statusgyph2: 'status-negative',
            statuslabel2: '',
            inverted2: true,
            decimal: 2
        },
        {
            title: 'Hurricane GX',
            introductionText: 'resale product',
            currency: 'Euro',
            amount: 487.50,
            image: 'http://picsum.photos/id/1018/400',
            gylp1: 'private',
            gylp2: 'flag',
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
