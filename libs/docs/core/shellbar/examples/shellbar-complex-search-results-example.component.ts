import { Component, inject, OnInit, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { BarModule, BarRightDirective } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { IllustratedMessageModule, SvgConfig } from '@fundamental-ngx/core/illustrated-message';
import { ListModule } from '@fundamental-ngx/core/list';
import { MenuModule } from '@fundamental-ngx/core/menu';
import { MessageToastModule, MessageToastService } from '@fundamental-ngx/core/message-toast';
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
    SearchFieldComponent,
    SearchInput,
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
    shellSearchField = viewChild<SearchFieldComponent>('shellSearchField');

    dataSource: SearchFieldDataSource<any>;

    expanded = true;

    exampleType: 'default' | 'advancedFilter' | 'mobile' = 'default';

    emptyResultsType: 'illustratedMessage' | 'customSuggestions' = 'illustratedMessage';

    emptyDefaultSuggestions: SuggestionItem[] = [
        {
            value: 'Peach',
            data: {
                type: 'fruit'
            }
        },
        {
            value: 'Pear',
            data: {
                type: 'fruit'
            }
        },
        {
            value: 'Plum',
            data: {
                type: 'fruit'
            }
        }
    ];

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

    xsmallConfig: SvgConfig = {
        xsmall: {
            url: 'assets/images/sapIllus-Ice-Cream-Demo-ExtraSmall.svg',
            id: 'sapIllus-Ice-Cream-Demo-ExtraSmall'
        }
    };

    suggestionsLoading = false;

    private _messageToastService = inject(MessageToastService);

    ngOnInit(): void {
        this.dataSource = new SearchFieldDataSource(new ShellSearchFieldDataProvider());
        SUGGESTIONS[0].children?.forEach((child) => {
            this.emptyDefaultSuggestions.push(child);
        });
    }

    onZoomGlyphClick(): void {
        alert('Edit profile');
    }

    actionPicked(action: string): void {
        this.openMessageToast(action);
    }

    openMessageToast(action: string): void {
        const content = `${action} action performed`;
        this._messageToastService.open(content, {
            duration: 5000
        });
    }

    showAllSearchResultsClicked(): void {
        this.suggestionsLoading = true;
        setTimeout(() => {
            this.suggestionsLoading = false;
            this.shellSearchField()?.resetCategory();
            this.shellSearchField()?.clearTextInput();
        }, 500);
    }

    submit(event: SearchInput): void {
        alert('Search submitted. See developer console for event');
        console.log(event);
    }
}

export class ShellSearchFieldDataProvider extends DataProvider<SuggestionItem> {
    constructor() {
        super();
    }

    fetch(params: Map<string, string>): Observable<SuggestionItem[]> {
        const data = SUGGESTIONS;
        const name = params.get('keyword');
        const category = params.get('category');
        if ((!name || name.trim() === '') && !category) {
            return of(data);
        } else {
            const filteredData = data.filter((suggestion) => {
                let foundMatchingChild = false;
                if (suggestion.children) {
                    for (let i = 0; i < suggestion.children.length && !foundMatchingChild; i++) {
                        foundMatchingChild = this._checkForMatches(suggestion.children[i], name, category);
                    }
                } else {
                    foundMatchingChild = this._checkForMatches(suggestion, name, category);
                }
                return foundMatchingChild;
            });
            return of(filteredData);
        }
    }

    private _checkForMatches(item: any, name: string | undefined, category: string | undefined): boolean {
        let foundMatchingItem = false;
        if (name && category) {
            if (item.value.toLowerCase().indexOf(name.toLowerCase()) > -1 && item.data?.type === category) {
                foundMatchingItem = true;
            }
        } else if (name) {
            if (item.value.toLowerCase().indexOf(name.toLowerCase()) > -1) {
                foundMatchingItem = true;
            }
        } else if (category) {
            if (item.data?.type === category) {
                foundMatchingItem = true;
            }
        }
        return foundMatchingItem;
    }
}

const SUGGESTIONS: SuggestionItem[] = [
    {
        value: 'Fruits',
        isGroupHeader: true,
        children: [
            {
                value: 'Apple',
                data: {
                    type: 'fruit',
                    listIconGlyph: 'globe'
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
                    prefix: 'Prefix text:',
                    actionButtons: [
                        {
                            actionButtonGlyph: 'refresh',
                            actionButtonCallback: () => {
                                alert('Blueberry refresh button clicked');
                            },
                            actionButtonId: 'refresh-button-1',
                            actionButtonLabel: 'Refresh Item'
                        },
                        {
                            actionButtonGlyph: 'settings',
                            actionButtonCallback: () => {
                                alert('Blueberry settings button clicked');
                            },
                            actionButtonLabel: 'Settings'
                        }
                    ],
                    showDeleteButton: true,
                    deleteCallback: () => {
                        alert('Blueberry delete button clicked');
                    }
                }
            },
            {
                value: 'Cherry',
                data: {
                    type: 'fruit'
                }
            }
        ],
        searchInScopeText: 'Search in [Fruits]',
        searchInScopeCounter: 1234,
        searchInScopeCallback: () => {
            alert('Search in scope callback clicked');
        }
    },
    {
        value: 'Vegetables',
        isGroupHeader: true,
        children: [
            {
                value: 'Broccoli',
                data: {
                    type: 'vegetable',
                    subline: 'Flower vegetable'
                }
            },
            {
                value: 'Carrot',
                data: {
                    type: 'vegetable',
                    subline: 'Root vegetable',
                    listIconGlyph: 'cart'
                }
            },
            {
                value: 'Corn',
                data: {
                    type: 'vegetable',
                    avatarLabel: 'John Doe'
                }
            },
            {
                value: 'Radish',
                data: {
                    type: 'vegetable'
                }
            }
        ],
        showMoreText: 'Show More',
        showMoreCounter: 1234,
        showMoreCallback: () => {
            alert('Show more callback clicked');
        }
    }
];
