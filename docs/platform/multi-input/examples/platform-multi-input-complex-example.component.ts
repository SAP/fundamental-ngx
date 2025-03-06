import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FdpFormGroupModule, PlatformMultiInputModule } from '@fundamental-ngx/platform/form';
import { DATA_PROVIDERS } from '@fundamental-ngx/platform/shared';

@Component({
    selector: 'fdp-platform-multi-input-complex-example',
    templateUrl: './platform-multi-input-complex-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: DATA_PROVIDERS, useValue: new Map() }],
    imports: [FormsModule, FdpFormGroupModule, PlatformMultiInputModule, ReactiveFormsModule]
})
export class PlatformMultiInputComplexExampleComponent {
    list_elements = [
        {
            state: 'Alabama',
            description: 'Cupidatat aliquip officia reprehenderit aute sit ex consectetur exercitation.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'Alaska',
            description:
                'Velit ullamco velit nisi officia id nostrud ullamco non culpa incididunt do quis magna excepteur.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'Arizona',
            description: 'Ipsum nulla commodo ad nostrud aliquip nulla ea ut elit.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'Arkansas',
            description: 'Incididunt et aliquip laborum adipisicing.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'California',
            description: 'Proident voluptate elit voluptate non dolor est eiusmod.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'Colorado',
            description:
                'Proident consequat aute consequat ipsum pariatur et exercitation excepteur elit occaecat proident exercitation aute.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'Connecticut',
            description: 'Sit Lorem magna veniam et et labore pariatur ea in quis deserunt.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'Colorado',
            description: 'Reprehenderit sit ex dolor irure dolor.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'Connecticut',
            description: 'Irure magna nisi cillum commodo elit anim consectetur pariatur eu magna est dolore dolore.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'Kentucky',
            description: 'Duis consectetur laborum et ea consectetur aute dolore eu.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'Delaware',
            description:
                'Incididunt qui ipsum mollit quis consequat est exercitation sint exercitation cillum officia deserunt.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'Florida',
            description:
                'Irure non consequat consectetur commodo magna culpa commodo duis ipsum sit consequat qui ea sunt.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'Georgia',
            description: 'Elit ipsum id ullamco sint nisi ipsum anim fugiat tempor ad.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'Hawaii',
            description: 'Deserunt aliquip laborum cupidatat duis esse proident eu ex do ad irure Lorem consequat.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'Idaho',
            description: 'Labore anim ullamco exercitation voluptate id id deserunt ex.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'Illinois',
            description: 'Laboris laborum anim anim dolor proident proident proident ex.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'Indiana',
            description: 'Eu irure enim elit et fugiat.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'Iowa',
            description: 'Consectetur laborum consequat pariatur nisi qui sit veniam culpa.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'Kansas',
            description: 'Eu laborum minim dolore consectetur ex elit officia aliqua aute incididunt.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'Kentucky',
            description: 'Ea consectetur incididunt adipisicing laborum adipisicing reprehenderit deserunt incididunt.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'Louisiana',
            description: 'Irure ut officia velit id id eiusmod qui id velit ipsum et.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'Maine',
            description:
                'Dolore deserunt veniam velit tempor in nulla magna tempor sunt velit exercitation quis dolor reprehenderit.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'Maryland',
            description: 'Do qui ipsum adipisicing mollit consectetur mollit magna aliquip ea.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'Massachusetts',
            description: 'Irure ut nulla minim deserunt.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'Michigan',
            description:
                'Esse nostrud ex est incididunt anim qui nulla quis consectetur dolore aliquip pariatur eiusmod sint.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'Minnesota',
            description: 'Deserunt nulla et consectetur incididunt laboris et.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'Mississippi',
            description: 'Deserunt duis qui velit culpa eu ipsum velit ut.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'Missouri',
            description: 'Quis voluptate sint adipisicing ipsum in magna esse duis elit.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'Montana',
            description: 'Eu id nisi voluptate enim proident est ad.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'Nebraska',
            description: 'Proident veniam culpa qui sit in adipisicing do dolore deserunt fugiat.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'Nevada',
            description: 'Et minim dolor eiusmod dolor excepteur do esse id duis nulla eu.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'New Hampshire',
            description:
                'Labore reprehenderit aute incididunt velit deserunt consectetur nulla irure amet elit voluptate esse velit.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'New Jersey',
            description:
                'Incididunt labore dolore proident exercitation qui eiusmod ad nostrud laboris cupidatat ullamco ea.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'New Mexico',
            description: 'Cillum ut deserunt incididunt consectetur ullamco.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'New York',
            description: 'Magna amet enim qui nostrud aute est.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'North Carolina',
            description:
                'RaleiUt ad fugiat sint fugiat adipisicing ex in pariatur proident culpa nostrud nulla eu officia.gh',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'North Dakota',
            description: 'Culpa sint occaecat amet incididunt do aliquip nulla Lorem laborum amet ullamco.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'Ohio',
            description: 'Officia Lorem incididunt occaecat occaecat eiusmod.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'Oklahoma',
            description: 'Exercitation voluptate voluptate ad irure elit.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'Oregon',
            description: 'Sit reprehenderit excepteur ut incididunt culpa dolor ea occaecat ex nulla do minim est id.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'Pennsylvania',
            description: 'Aliquip et ut cupidatat veniam officia fugiat nulla laboris consectetur excepteur sunt.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'Rhode Island',
            description: 'Ex ullamco id officia labore qui aliqua est et cillum irure duis ea cillum voluptate.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'South Carolina',
            description: 'Ad ad proident mollit labore in occaecat dolore nisi adipisicing ullamco excepteur aliqua.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'South Dakota',
            description: 'Esse sit elit eu aliqua adipisicing ullamco do deserunt.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'Tennessee',
            description: 'Ea mollit nulla laborum et velit enim amet Lorem pariatur et.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'Texas',
            description: 'Commodo do Lorem eu in reprehenderit.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'Utah',
            description: 'Veniam cillum minim aute laborum dolore consequat duis ut.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'Vermont',
            description: 'Non labore ullamco minim est aliqua ut qui ad sit exercitation aliquip.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'Virginia',
            description: 'Incididunt est fugiat deserunt est pariatur sint amet.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'Washington',
            description: 'Aliqua officia labore officia amet do nostrud esse irure.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'West Virginia',
            description: 'Commodo enim sint laborum dolor et do sunt nulla consequat.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'Wisconsin',
            description:
                'Occaecat quis ut aliquip labore non reprehenderit sunt laboris elit officia laboris commodo tempor.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        },
        {
            state: 'Wyoming',
            description: 'Id duis veniam sunt eiusmod deserunt tempor quis est velit labore.',
            avatarSrc: 'https://picsum.photos/400/400?nature'
        }
    ];
}
