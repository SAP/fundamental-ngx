import { Component, OnInit, ViewChild } from '@angular/core';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { BarModule, BarRightDirective } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ListModule } from '@fundamental-ngx/core/list';
import { MenuModule } from '@fundamental-ngx/core/menu';
import { MessageToastModule, MessageToastService } from '@fundamental-ngx/core/message-toast';
import { PanelModule } from '@fundamental-ngx/core/panel';
import { PopoverModule } from '@fundamental-ngx/core/popover';
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
        ShellbarActionComponent
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
        avatarLabel: 'farmerName'
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
            antecedent: 'Prefix text:'
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
