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
            headerTitle: 'Header Title 1',
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
