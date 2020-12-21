import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MobileModeConfig } from '@fundamental-ngx/core';

export interface User {
    firstName: string;
    lastName: string;
}

@Component({
    selector: 'fdp-platform-multi-input-mobile-example',
    templateUrl: './platform-mulit-input-mobile-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformMulitInputMobileExampleComponent {
    _dataSource = [
        {
            firstName: 'Alabama',
            lastName: 'Cupidatat aliquip officia reprehenderit aute sit ex consectetur exercitation.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'Alaska',
            lastName:
                'Velit ullamco velit nisi officia id nostrud ullamco non culpa incididunt do quis magna excepteur.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'Arizona',
            lastName: 'Ipsum nulla commodo ad nostrud aliquip nulla ea ut elit.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'Arkansas',
            lastName: 'Incididunt et aliquip laborum adipisicing.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'California',
            lastName: 'Proident voluptate elit voluptate non dolor est eiusmod.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'Colorado',
            lastName:
                'Proident consequat aute consequat ipsum pariatur et exercitation excepteur elit occaecat proident exercitation aute.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'Connecticut',
            lastName: 'Sit Lorem magna veniam et et labore pariatur ea in quis deserunt.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'Colorado',
            lastName: 'Reprehenderit sit ex dolor irure dolor.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'Connecticut',
            lastName: 'Irure magna nisi cillum commodo elit anim consectetur pariatur eu magna est dolore dolore.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'Kentucky',
            lastName: 'Duis consectetur laborum et ea consectetur aute dolore eu.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'Delaware',
            lastName:
                'Incididunt qui ipsum mollit quis consequat est exercitation sint exercitation cillum officia deserunt.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'Florida',
            lastName:
                'Irure non consequat consectetur commodo magna culpa commodo duis ipsum sit consequat qui ea sunt.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'Georgia',
            lastName: 'Elit ipsum id ullamco sint nisi ipsum anim fugiat tempor ad.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'Hawaii',
            lastName: 'Deserunt aliquip laborum cupidatat duis esse proident eu ex do ad irure Lorem consequat.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'Idaho',
            lastName: 'Labore anim ullamco exercitation voluptate id id deserunt ex.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'Illinois',
            lastName: 'Laboris laborum anim anim dolor proident proident proident ex.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'Indiana',
            lastName: 'Eu irure enim elit et fugiat.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'Iowa',
            lastName: 'Consectetur laborum consequat pariatur nisi qui sit veniam culpa.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'Kansas',
            lastName: 'Eu laborum minim dolore consectetur ex elit officia aliqua aute incididunt.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'Kentucky',
            lastName: 'Ea consectetur incididunt adipisicing laborum adipisicing reprehenderit deserunt incididunt.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'Louisiana',
            lastName: 'Irure ut officia velit id id eiusmod qui id velit ipsum et.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'Maine',
            lastName:
                'Dolore deserunt veniam velit tempor in nulla magna tempor sunt velit exercitation quis dolor reprehenderit.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'Maryland',
            lastName: 'Do qui ipsum adipisicing mollit consectetur mollit magna aliquip ea.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'Massachusetts',
            lastName: 'Irure ut nulla minim deserunt.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'Michigan',
            lastName:
                'Esse nostrud ex est incididunt anim qui nulla quis consectetur dolore aliquip pariatur eiusmod sint.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'Minnesota',
            lastName: 'Deserunt nulla et consectetur incididunt laboris et.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'Mississippi',
            lastName: 'Deserunt duis qui velit culpa eu ipsum velit ut.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'Missouri',
            lastName: 'Quis voluptate sint adipisicing ipsum in magna esse duis elit.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'Montana',
            lastName: 'Eu id nisi voluptate enim proident est ad.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'Nebraska',
            lastName: 'Proident veniam culpa qui sit in adipisicing do dolore deserunt fugiat.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'Nevada',
            lastName: 'Et minim dolor eiusmod dolor excepteur do esse id duis nulla eu.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'New Hampshire',
            lastName:
                'Labore reprehenderit aute incididunt velit deserunt consectetur nulla irure amet elit voluptate esse velit.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'New Jersey',
            lastName:
                'Incididunt labore dolore proident exercitation qui eiusmod ad nostrud laboris cupidatat ullamco ea.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'New Mexico',
            lastName: 'Cillum ut deserunt incididunt consectetur ullamco.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'New York',
            lastName: 'Magna amet enim qui nostrud aute est.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'North Carolina',
            lastName:
                'RaleiUt ad fugiat sint fugiat adipisicing ex in pariatur proident culpa nostrud nulla eu officia.gh',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'North Dakota',
            lastName: 'Culpa sint occaecat amet incididunt do aliquip nulla Lorem laborum amet ullamco.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'Ohio',
            lastName: 'Officia Lorem incididunt occaecat occaecat eiusmod.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'Oklahoma',
            lastName: 'Exercitation voluptate voluptate ad irure elit.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'Oregon',
            lastName: 'Sit reprehenderit excepteur ut incididunt culpa dolor ea occaecat ex nulla do minim est id.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'Pennsylvania',
            lastName: 'Aliquip et ut cupidatat veniam officia fugiat nulla laboris consectetur excepteur sunt.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'Rhode Island',
            lastName: 'Ex ullamco id officia labore qui aliqua est et cillum irure duis ea cillum voluptate.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'South Carolina',
            lastName: 'Ad ad proident mollit labore in occaecat dolore nisi adipisicing ullamco excepteur aliqua.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'South Dakota',
            lastName: 'Esse sit elit eu aliqua adipisicing ullamco do deserunt.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'Tennessee',
            lastName: 'Ea mollit nulla laborum et velit enim amet Lorem pariatur et.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'Texas',
            lastName: 'Commodo do Lorem eu in reprehenderit.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'Utah',
            lastName: 'Veniam cillum minim aute laborum dolore consequat duis ut.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'Vermont',
            lastName: 'Non labore ullamco minim est aliqua ut qui ad sit exercitation aliquip.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'Virginia',
            lastName: 'Incididunt est fugiat deserunt est pariatur sint amet.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'Washington',
            lastName: 'Aliqua officia labore officia amet do nostrud esse irure.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'West Virginia',
            lastName: 'Commodo enim sint laborum dolor et do sunt nulla consequat.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'Wisconsin',
            lastName:
                'Occaecat quis ut aliquip labore non reprehenderit sunt laboris elit officia laboris commodo tempor.',
            image: 'https://placeimg.com/400/400/nature'
        },
        {
            firstName: 'Wyoming',
            lastName: 'Id duis veniam sunt eiusmod deserunt tempor quis est velit labore.',
            image: 'https://placeimg.com/400/400/nature'
        }
    ];

    mobileConfig: MobileModeConfig = {
        title: 'Title',
        approveButtonText: 'approve',
        cancelButtonText: 'Cancel',
        hasCloseButton: true
    };
}
