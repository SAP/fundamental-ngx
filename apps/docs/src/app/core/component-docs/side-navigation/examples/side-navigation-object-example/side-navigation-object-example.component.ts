import { Component } from '@angular/core';
import { SideNavigationModel } from '@fundamental-ngx/core/side-navigation';

@Component({
    selector: 'fd-side-navigation-object-example',
    templateUrl: 'side-navigation-object-example.component.html'
})
export class SideNavigationObjectExampleComponent {
    sideNavigationConfiguration: SideNavigationModel = {
        condensed: false,
        mainNavigation: {
            items: [
                {
                    headerTitle: 'Header Title 1'
                },
                {
                    link: {
                        callback: () => this.callbackFunction('First Item'),
                        icon: 'home',
                        title: 'Link 1'
                    }
                },
                {
                    headerTitle: 'Header Title 2'
                },
                {
                    link: {
                        icon: 'account',
                        title: 'Link 2',
                        routerLink: '#'
                    }
                },
                {
                    expanded: true,
                    link: {
                        icon: 'activate',
                        title: 'Link 3'
                    },
                    list: {
                        textOnly: true,
                        items: [
                            {
                                link: {
                                    title: 'Sublink 1'
                                }
                            },
                            {
                                link: {
                                    title: 'Sublink 2',
                                    selected: true
                                }
                            },
                            {
                                link: {
                                    title: 'Sublink 3'
                                }
                            },
                            {
                                link: {
                                    title: 'Sublink 4'
                                }
                            }
                        ]
                    }
                },
                {
                    link: {
                        icon: 'approvals',
                        title: 'Link 4'
                    }
                }
            ]
        },
        utilityNavigation: {
            textOnly: true,
            items: [
                {
                    headerTitle: 'Header Title 3'
                },
                {
                    link: {
                        title: 'Link 1'
                    }
                },
                {
                    link: {
                        title: 'Link 2'
                    }
                },
                {
                    link: {
                        title: 'Link 3'
                    }
                }
            ]
        }
    };

    callbackFunction(message: string): void {
        alert('Link Clicked ' + message);
    }
}
