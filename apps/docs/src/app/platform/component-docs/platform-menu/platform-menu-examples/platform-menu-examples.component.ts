import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem, MenuGroup } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-menu-example',
    templateUrl: './platform-menu-basic-example.component.html',
    styleUrls: ['./platform-menu-examples.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PlatformBasicMenuExampleComponent implements OnInit {
    basicMenuData: (MenuItem | MenuGroup)[] = [];

    ngOnInit() {
        this.basicMenuData = [
            {
                label: 'First Item',
                command: () => {
                    alert('First');
                }
            },
            {
                label: 'Second Item',
                command: () => {
                    alert('second');
                }
            },
            {
                label: 'Third Item',
                command: () => {
                    alert('Third');
                }
            }
        ];
    }
}

@Component({
    selector: 'fdp-menu-group-example',
    templateUrl: './platform-menu-group-example.component.html',
    styleUrls: ['./platform-menu-examples.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PlatformMenuGroupExampleComponent implements OnInit {
    groupMenuData: (MenuItem | MenuGroup)[] = [];
    ngOnInit() {
        this.groupMenuData = [
            {
                label: 'First Item',
                command: () => {
                    alert('First');
                }
            },
            {
                label: 'Second Item',
                groupItems: [
                    {
                        label: 'Item 1 in Group 1',
                        command: () => {
                            alert('Item 1 in Group 1 called');
                        }
                    },
                    {
                        label: 'Item 2 in Group 1',
                        command: () => {
                            alert('Item 2 in Group 1 called');
                        },
                        disabled: true
                    }
                ]
            },
            {
                label: 'Third Item',
                command: () => {
                    alert('Third');
                }
            }
        ];
    }
}

@Component({
    selector: 'fdp-menu-separator-example',
    templateUrl: './platform-menu-separator-example.component.html',
    styleUrls: ['./platform-menu-examples.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PlatformMenuSeparatorExampleComponent implements OnInit {
    basicMenuData: (MenuItem | MenuGroup)[] = [];

    ngOnInit() {
        this.basicMenuData = [
            {
                label: 'First Item',
                command: () => {
                    alert('First');
                }
            },
            {
                label: 'Second Item',
                command: () => {
                    alert('second');
                }
            },
            {
                label: 'Third Item',
                command: () => {
                    alert('Third');
                }
            }
        ];
    }
}

@Component({
    selector: 'fdp-menu-icons-example',
    templateUrl: './platform-menu-icons-example.component.html',
    styleUrls: ['./platform-menu-examples.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PlatformMenuIconsExampleComponent implements OnInit {
    iconMenuData: (MenuItem | MenuGroup)[] = [];

    ngOnInit() {
        this.iconMenuData = [
            {
                label: 'First Item with add-on. Click on item to toggle state.',
                command: () => {
                    alert('First');
                },
                selectable: true,
                selected: true
            },
            {
                label: 'Second Item with icon',
                command: () => {
                    alert('second');
                },
                icon: 'sap-icon--activity-items'
            },
            {
                label: 'Third Item with double-sided icons',
                command: () => {
                    alert('Third');
                },
                icon: 'sap-icon--vehicle-repair',
                secondaryIcon: 'sap-icon--grid'
            }
        ];
    }
}

@Component({
    selector: 'fdp-menu-complex-example',
    templateUrl: './platform-menu-complex-example.component.html',
    styleUrls: ['./platform-menu-examples.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PlatformComplexMenuExampleComponent implements OnInit {
    complexMenuData: (MenuItem | MenuGroup)[] = [];
    ngOnInit() {
        this.complexMenuData = [
            {
                label:
                    'Long item in order to show truncation. Long item in order to show truncation.' +
                    'Long item in order to show truncation. Long item in order to show truncation. Long item in order to show truncation. ',
                selectable: true,
                selected: false,
                secondaryIcon: 'sap-icon--grid',
                command: () => {
                    alert(' I am an example callback');
                }
            },
            {
                label: 'Item 2',
                icon: 'sap-icon--vehicle-repair',
                secondaryIcon: 'sap-icon--grid',
                selectable: false,
                command: () => {
                    alert(' I am an example callback for large');
                }
            },
            {
                label: 'Group 1',
                groupItems: [
                    {
                        label: 'Item 3 in group',
                        command: () => {
                            alert('Item 3 in group called');
                        },
                        secondaryIcon: 'sap-icon--grid'
                    },
                    {
                        label: 'Item 4 in group',
                        selectable: true,
                        selected: true,
                        command: () => {
                            alert('Item 4 in group called');
                        }
                    }
                ],
                icon: 'sap-icon--vehicle-repair'
            },
            {
                label: 'Item 5',
                selectable: false,
                selected: false,
                command: () => {
                    alert(' Item 5 called');
                }
            },
            {
                label: 'Item 6',
                icon: 'sap-icon--vehicle-repair',
                command: () => {
                    alert('Item 6 called');
                }
            },
            {
                label: 'Item 7',
                command: () => {
                    alert('Item 7 called');
                }
            },
            {
                label: 'Group 2',
                groupItems: [
                    {
                        label: 'Item 8 in group',
                        command: () => {
                            alert('Item 8 in group called');
                        }
                    },
                    {
                        label: 'Item 9 in group',
                        selectable: true,
                        selected: true,
                        command: () => {
                            alert('Item 9 in group called');
                        },
                        disabled: true
                    },
                    {
                        label: 'Item 10 in group',
                        tooltipLabel: 'customized label',
                        command: () => {
                            alert('Item 10 in group called');
                        }
                    }
                ]
            }
        ];
    }
}
