import { Component } from '@angular/core';
import { SideNavigationModel } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-side-navigation-object-example',
    templateUrl: 'side-navigation-object-example.component.html'
})
export class SideNavigationObjectExampleComponent {

    sideNavigationConfiguration: SideNavigationModel = {
        condensed: false,
        mainNavigation: {
            headerTitle: 'Header Title 1',
            items: [
                {
                    link: {
                        callback: () => this.callbackFunction('First Item'),
                        icon: 'menu',
                        title: 'Link 1'
                    }
                },
                {
                    link: {
                        icon: 'menu',
                        title: 'Link 2'
                    }
                },
                {
                    expanded: true,
                    link: {
                        icon: 'menu',
                        title: 'Link 3',
                    },
                    list: {
                        items: [
                            {
                                link: {
                                    icon: 'menu',
                                    title: 'Link 1'
                                }
                            },
                            {
                                link: {
                                    icon: 'menu',
                                    title: 'Link 2'
                                }
                            },
                            {
                                expanded: false,
                                link: {
                                    icon: 'menu',
                                    title: 'Link 3',
                                },
                                list: {
                                    items: [
                                        {
                                            link: {
                                                icon: 'menu',
                                                title: 'Link 1'
                                            }
                                        },
                                        {
                                            link: {
                                                icon: 'menu',
                                                title: 'Link 2'
                                            }
                                        },
                                        {
                                            link: {
                                                icon: 'menu',
                                                title: 'Link 3'
                                            }
                                        },
                                        {
                                            link: {
                                                icon: 'menu',
                                                title: 'Link 4',
                                                selected: true
                                            }
                                        }
                                    ]
                                }
                            },
                            {
                                link: {
                                    icon: 'menu',
                                    title: 'Link 4'
                                }
                            }
                        ]
                    }
                },
                {
                    link: {
                        icon: 'menu',
                        title: 'Link 4'
                    }
                }
            ]
        },
        utilityNavigation: {
            textOnly: true,
            items: [
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
    }


    callbackFunction(message: string): void {
        alert('Link Clicked ' + message);
    }

}
