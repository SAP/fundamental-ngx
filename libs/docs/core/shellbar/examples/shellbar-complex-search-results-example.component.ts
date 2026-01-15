import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { BarModule, BarRightDirective } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { IllustratedMessageModule, SvgConfig } from '@fundamental-ngx/core/illustrated-message';
import { ListModule } from '@fundamental-ngx/core/list';
import { MenuModule } from '@fundamental-ngx/core/menu';
import { MessageToastModule, MessageToastService } from '@fundamental-ngx/core/message-toast';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import { PanelModule } from '@fundamental-ngx/core/panel';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { SegmentedButtonComponent } from '@fundamental-ngx/core/segmented-button';
import {
    ShellbarActionComponent,
    ShellbarActionsComponent,
    ShellbarBrandingComponent,
    ShellbarComponent,
    ShellbarLogoComponent,
    ShellbarTitleComponent
} from '@fundamental-ngx/core/shellbar';
import {
    UserMenuBodyComponent,
    UserMenuComponent,
    UserMenuContentContainerComponent,
    UserMenuControlComponent,
    UserMenuControlElementDirective,
    UserMenuFooterComponent,
    UserMenuHeaderContainerDirective,
    UserMenuHeaderDirective,
    UserMenuListComponent,
    UserMenuListItemComponent,
    UserMenuSublineDirective,
    UserMenuSublistComponent,
    UserMenuUserNameDirective
} from '@fundamental-ngx/core/user-menu';
import {
    SearchFieldComponent,
    SearchResultsDataModel,
    SuggestionItem,
    ValueLabelItem
} from '@fundamental-ngx/platform/search-field';
import { DataProvider, SearchFieldDataSource } from '@fundamental-ngx/platform/shared';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'fd-shellbar-complex-search-results-example',
    templateUrl: './shellbar-complex-search-results-example.component.html',
    imports: [
        ShellbarComponent,
        ShellbarLogoComponent,
        ShellbarTitleComponent,
        ShellbarActionsComponent,
        ShellbarBrandingComponent,
        UserMenuComponent,
        UserMenuBodyComponent,
        UserMenuControlComponent,
        UserMenuFooterComponent,
        UserMenuContentContainerComponent,
        UserMenuHeaderContainerDirective,
        UserMenuHeaderDirective,
        UserMenuSublineDirective,
        UserMenuUserNameDirective,
        UserMenuListComponent,
        UserMenuSublistComponent,
        UserMenuListItemComponent,
        UserMenuControlElementDirective,
        AvatarComponent,
        PopoverModule,
        ListModule,
        PanelModule,
        MenuModule,
        ButtonComponent,
        BarModule,
        BarRightDirective,
        MessageToastModule,
        SearchFieldComponent,
        ShellbarActionComponent,
        FormsModule,
        SegmentedButtonComponent,
        IllustratedMessageModule
    ]
})
export class ShellbarComplexSearchResultsExampleComponent implements OnInit {
    @ViewChild(UserMenuComponent)
    userMenuComponent: UserMenuComponent;

    @ViewChild(SearchFieldComponent)
    shellSearchField: SearchFieldComponent;

    dataSource: SearchFieldDataSource<any>;

    expanded = true;
    isOpen = false;

    exampleType: 'categories' | 'advancedFilter' | 'mobile' = 'categories';

    categories: ValueLabelItem[] = [
        {
            value: 'fruit',
            label: 'Fruits'
        },
        {
            value: 'vegetable',
            label: 'Vegetables'
        }
    ];

    actions = [
        {
            glyph: 'pool',
            label: 'Pool',
            notificationCount: 3,
            notificationLabel: 'Pool Count'
        },
        {
            glyph: 'bell',
            label: 'Notifications',
            notificationCount: 12,
            notificationLabel: 'Unread Notifications'
        }
    ];

    dataModel: SearchResultsDataModel = {
        subline: 'description',
        listIconGlyph: 'icon',
        prefix: 'antecedent',
        avatarLabel: 'farmerName',
        actionButtons: 'buttons',
        actionButtonGlyph: 'buttonGlyph',
        actionButtonCallback: 'buttonCallback',
        actionButtonLabel: 'buttonLabel',
        showDeleteButton: 'canDelete',
        deleteCallback: 'deleteFn',
        groupBy: 'type'
    };

    mobileConfig: MobileModeConfig = {
        approveButtonText: 'OK',
        hasCloseButton: true
    };

    xsmallConfig: SvgConfig = {
        xsmall: {
            url: 'assets/images/sapIllus-Ice-Cream-Demo-ExtraSmall.svg',
            id: 'sapIllus-Ice-Cream-Demo-ExtraSmall'
        }
    };

    constructor(private _messageToastService: MessageToastService) {}

    ngOnInit(): void {
        this.dataSource = new SearchFieldDataSource(new ShellSearchFieldDataProvider());
    }

    isOpenChange(isOpen: boolean): void {
        this.isOpen = isOpen;
    }

    onZoomGlyphClick(): void {
        alert('Edit profile');
    }

    actionPicked(action: string): void {
        this.openMessageToast(action);
        this.userMenuComponent.close();
    }

    openMessageToast(action: string): void {
        const content = `${action} action performed`;
        this._messageToastService.open(content, {
            duration: 5000
        });
    }

    searchInScopeClicked(): void {
        alert('Search in scope clicked');
    }

    showAllSearchResultsClicked(): void {
        this.shellSearchField.clearTextInput();
    }
}

export class ShellSearchFieldDataProvider extends DataProvider<SuggestionItem> {
    constructor() {
        super();
    }

    fetch(params: Map<string, string>): Observable<SuggestionItem[]> {
        let data = SUGGESTIONS;
        const name = params.get('keyword');
        if (name) {
            const keyword = name.toLowerCase();
            data = data.filter((item) => item.value.toLowerCase().indexOf(keyword) > -1);
        }
        if (params.get('category')) {
            data = data.filter((item) => item.data.type === params.get('category'));
        }
        return of(data);
    }
}

const SUGGESTIONS: SuggestionItem[] = [
    {
        value: 'Apple',
        data: {
            type: 'fruit',
            icon: 'globe'
        }
    },
    {
        value: 'Banana',
        data: {
            type: 'fruit'
        }
    },
    {
        value: 'Blueberry',
        data: {
            type: 'fruit',
            antecedent: 'Prefix text:',
            buttons: [
                {
                    buttonGlyph: 'refresh',
                    buttonCallback: () => {
                        alert('Blueberry refresh button clicked');
                    },
                    buttonLabel: 'Refresh Item'
                },
                {
                    buttonGlyph: 'settings',
                    buttonCallback: () => {
                        alert('Blueberry settings button clicked');
                    },
                    buttonLabel: 'Settings'
                }
            ],
            canDelete: true,
            deleteFn: () => {
                alert('Blueberry delete button clicked');
            }
        }
    },
    {
        value: 'Broccoli',
        data: {
            type: 'vegetable',
            description: 'Flower vegetable'
        }
    },
    {
        value: 'Carrot',
        data: {
            type: 'vegetable',
            description: 'Root vegetable',
            icon: 'cart'
        }
    },
    {
        value: 'Cherry',
        data: {
            type: 'fruit'
        }
    },
    {
        value: 'Corn',
        data: {
            type: 'vegetable',
            farmerName: 'John Doe'
        }
    },
    {
        value: 'Radish',
        data: {
            type: 'vegetable'
        }
    }
];
