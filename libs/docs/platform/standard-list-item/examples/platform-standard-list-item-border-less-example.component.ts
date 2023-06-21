import { Component } from '@angular/core';
import { ListAvatarConfig } from '@fundamental-ngx/platform/list';

export interface ListItem {
    title: string;
    avatar: Partial<ListAvatarConfig>;
    description: string;
    secondary: string;
}

@Component({
    selector: 'fdp-platform-standard-list-item-border-less-example',
    templateUrl: './platform-standard-list-item-border-less-example.component.html'
})
export class PlatformStandardListItemBorderLessExampleComponent {
    items: ListItem[] = [
        {
            title:
                'Item1 A laptop computer, sometimes called a notebook computer by manufacturers,' +
                'is a battery- or AC-powered personal computer generally smaller than a briefcase that can ' +
                'easily be transported and conveniently',
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
            avatar: {
                image: 'https://picsum.photos/400/400?nature',
                ariaLabel: 'nature'
            }
        },
        {
            title: 'Item2',
            description: 'First text item in Byline (Standard text item)',
            secondary: 'Second text item in Byline (Can be semantic (Status) or not)',
            avatar: {
                circle: true,
                glyph: 'account',
                colorAccent: 10
            }
        },
        {
            title: 'Item3',
            description: 'First text item in Byline (Standard text item)',
            secondary: 'Second text item in Byline (Can be semantic (Status) or not)',
            avatar: {
                image: 'https://picsum.photos/400/400?nature',
                ariaLabel: 'nature'
            }
        },
        {
            title: 'Item4',
            avatar: {
                image: 'https://picsum.photos/400/400?nature',
                ariaLabel: 'nature'
            },
            description: 'First text item in Byline (Standard text item)',
            secondary: 'Second text item in Byline (Can be semantic (Status) or not)'
        }
    ];
}
