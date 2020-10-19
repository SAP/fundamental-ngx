import { Component, ChangeDetectionStrategy } from '@angular/core';

export interface User {
    firstName: string;
    lastName: string;
}

@Component({
    selector: 'fdp-platform-multi-input-example',
    templateUrl: './platform-mulit-input-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformMulitInputExampleComponent {
    _datasource = [
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
        }
    ];
}
