import { Component } from '@angular/core';

@Component({
    selector: 'fdp-platform-standard-list-item-border-less-example',
    templateUrl: './platform-standard-list-item-border-less-example.component.html'
})
export class PlatformStandardListItemBorderLessExampleComponent {
    items: any[] = [
        {
            title:
                'Item1 A laptop computer, sometimes called a notebook computer by manufacturers,' +
                'is a battery- or AC-powered personal computer generally smaller than a briefcase that can ' +
                'easily be transported and conveniently',
            avatarTitle: 'nature',
            description:
                'First text item in Byline (Standard text item)' +
                'A laptop computer, sometimes called a notebook computer by manufacturers,' +
                'is a battery- or AC-powered personal computer generally smaller than a briefcase that can ' +
                'easily be transported and conveniently',
            secondary:
                'Second text item in Byline (Can be semantic (Status) or not)' +
                'A laptop computer, sometimes called a notebook computer by manufacturers,' +
                'is a battery- or AC-powered personal computer generally smaller than a briefcase that can ' +
                'easily be transported and conveniently',
            avatarSrc: 'https://placeimg.com/400/400/nature'
        },
        {
            title: 'Item2',
            avatarSrc: 'https://placeimg.com/400/400/nature',
            avatarTitle: 'nature',
            description: 'First text item in Byline (Standard text item)',
            secondary: 'Second text item in Byline (Can be semantic (Status) or not)'
        },
        {
            title: 'Item3',
            avatarSrc: 'https://placeimg.com/400/400/nature',
            avatarTitle: 'nature',
            description: 'First text item in Byline (Standard text item)',
            secondary: 'Second text item in Byline (Can be semantic (Status) or not)'
        },
        {
            title: 'Item4',
            avatarSrc: 'https://placeimg.com/400/400/nature',
            avatarTitle: 'nature',
            description: 'First text item in Byline (Standard text item)',
            secondary: 'Second text item in Byline (Can be semantic (Status) or not)'
        }
    ];
}
