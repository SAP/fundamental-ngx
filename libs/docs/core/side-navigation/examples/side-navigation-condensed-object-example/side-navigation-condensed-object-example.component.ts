import { Component } from '@angular/core';
import { SideNavigationModel, SideNavigationModule } from '@fundamental-ngx/core/side-navigation';

@Component({
    selector: 'fd-side-navigation-condensed-object-example',
    templateUrl: 'side-navigation-condensed-object-example.component.html',
    standalone: true,
    imports: [SideNavigationModule]
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
                        icon: 'home',
                        title: 'Link 1'
                    }
                },
                {
                    link: {
                        icon: 'account',
                        title: 'Link 2'
                    }
                },
                {
                    link: {
                        icon: 'action-settings',
                        title: 'Link With Children',
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
                        icon: 'add-coursebook',
                        title: 'Link 4'
                    }
                }
            ]
        },
        utilityNavigation: {
            items: [
                {
                    link: {
                        icon: 'bubble-chart',
                        title: 'Link 1'
                    }
                },
                {
                    link: {
                        icon: 'chain-link',
                        title: 'Link 2'
                    }
                },
                {
                    link: {
                        icon: 'customize',
                        title: 'Link 3'
                    }
                }
            ]
        }
    };
}
