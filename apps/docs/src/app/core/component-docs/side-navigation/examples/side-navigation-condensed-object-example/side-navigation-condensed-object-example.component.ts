import { Component } from '@angular/core';
import { SideNavigationModel } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-side-navigation-condensed-object-example',
    templateUrl: 'side-navigation-condensed-object-example.component.html'
})
export class SideNavigationCondensedObjectExampleComponent {

    sideNavigationConfiguration: SideNavigationModel = {
        condensed: true,
        mainNavigation: {
            items: [
                {
                    headerTitle: 'Header Title 1'
                },
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
                        title: 'Link 3',
                        selected: true
                    },
                    list: {
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
                                    title: 'Link 3',
                                    selected: true
                                }
                            },
                            {
                                link: {
                                    title: 'Link 4'
                                }
                            }
                        ]
                    }
                },
                {
                    headerTitle: 'Header Title'
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
                }
            ]
        }
    }

}
