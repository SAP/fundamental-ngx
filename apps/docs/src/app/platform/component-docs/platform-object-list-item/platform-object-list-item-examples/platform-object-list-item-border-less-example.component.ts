import { Component } from '@angular/core';
@Component({
    selector: 'fdp-borderless-object-list-item-example',
    templateUrl: './platform-borderless-object-list-item-example.component.html'
})
export class PlatformObjectListItemBorderLessExampleComponent {
    items: any[] = [
        {
            'title': 'Action 1', 'introductionText': 'intro 1', 'currency': 'Euro', 'amount': '123,57', 'image': 'http://lorempixel.com/400/400/nature'
            , 'testObject': {
                'first attribute': [{ 'icon': 'flag', 'text': 'Flag', 'marker': true }, { 'icon': 'flag', 'text': 'Flag', 'marker': true }],
                'second attribute': [{ 'inverted': true, 'text': 'avaliable', 'status': true }],
                'third attribute': [],
            }
        },
        {
            'title': 'Action 2', 'introductionText': 'intro 2', 'currency': 'Euro', 'amount': '723,57', 'image': 'http://lorempixel.com/400/400/nature'
            , 'testObject': {
                'first attribute': [],
                'second attribute': [{ 'inverted': true, 'text': 'avaliable', 'status': true }],
                'third attribute': [{ 'text': 'avalible' }],
            }
        },
        {
            'title': 'Action 3', 'introductionText': 'intro 3', 'currency': 'Euro', 'amount': '173,57', 'image': 'http://lorempixel.com/400/400/nature'
            , 'testObject': {
                'first attribute': [{ 'icon': 'flag', 'text': 'Flag', 'marker': true }],
                'second attribute': [{ 'inverted': true, 'text': 'avaliable', 'status': true }],
                'third attribute': [{ 'text': 'avalible' }],
            }
        },
        {
            'title': 'Action 4', 'introductionText': 'intro 4', 'currency': 'Euro', 'amount': '823,57', 'image': 'http://lorempixel.com/400/400/nature'
            , 'testObject': {
                'first attribute': [{ 'icon': 'flag', 'text': 'Flag', 'marker': true }],
                'second attribute': [{ 'inverted': true, 'text': 'avaliable', 'status': true }],
                'third attribute': [{ 'text': 'avalible' }],
            }
        }];
}
