import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { QuickViewGroupItemContentComponent } from '../quick-view-group-item-content/quick-view-group-item-content.component';
import { QuickViewGroupItemLabelComponent } from '../quick-view-group-item-label/quick-view-group-item-label.component';
import { QuickViewGroupItemComponent } from '../quick-view-group-item/quick-view-group-item.component';
import { QuickViewGroupTitleComponent } from '../quick-view-group-title/quick-view-group-title.component';
import { QuickViewGroupComponent } from '../quick-view-group/quick-view-group.component';
import { QuickViewSubheaderSubtitleComponent } from '../quick-view-subheader-subtitle/quick-view-subheader-subtitle.component';
import { QuickViewSubheaderTitleComponent } from '../quick-view-subheader-title/quick-view-subheader-title.component';
import { QuickViewSubheaderComponent } from '../quick-view-subheader/quick-view-subheader.component';
import { QuickViewComponent } from './quick-view.component';

@Component({
    template: `
        <fd-quick-view #quickViewRef [id]="data.id">
            <fd-quick-view-subheader>
                <fd-avatar [image]="data.subHeader.avatar" size="s"></fd-avatar>
                <fd-quick-view-subheader-title>
                    {{ data.subHeader.title }}
                </fd-quick-view-subheader-title>
                <fd-quick-view-subheader-subtitle>
                    {{ data.subHeader.subtitle }}
                </fd-quick-view-subheader-subtitle>
            </fd-quick-view-subheader>
            @for (group of data.groups; track group) {
                <fd-quick-view-group>
                    <fd-quick-view-group-title>
                        {{ group.title }}
                    </fd-quick-view-group-title>
                    @for (item of group.items; track item) {
                        <fd-quick-view-group-item>
                            <fd-quick-view-group-item-label>
                                {{ item.label }}
                            </fd-quick-view-group-item-label>
                            <fd-quick-view-group-item-content>
                                @if (item.label === 'Mobile' || item.label === 'Phone' ? item.label : '') {
                                    <a [href]="'tel:' + item.value" fd-link>{{ item.value }}</a>
                                } @else if (item.label === 'Email') {
                                    <a [href]="'mailto:' + item.value" fd-link>{{ item.value }}</a>
                                } @else {
                                    <div>{{ item.value }}</div>
                                }
                            </fd-quick-view-group-item-content>
                        </fd-quick-view-group-item>
                    }
                </fd-quick-view-group>
            }
        </fd-quick-view>
    `,
    standalone: true,
    imports: [
        QuickViewComponent,
        QuickViewSubheaderComponent,
        QuickViewSubheaderTitleComponent,
        QuickViewSubheaderSubtitleComponent,
        QuickViewGroupComponent,
        QuickViewGroupTitleComponent,
        QuickViewGroupItemComponent,
        QuickViewGroupItemContentComponent,
        QuickViewGroupItemLabelComponent,
        AvatarComponent
    ]
})
class TestComponent {
    @ViewChild('quickViewRef', { read: ElementRef })
    quickViewRef: ElementRef;

    data = {
        id: 'employee',
        title: 'Employee',
        subHeader: {
            title: 'Michael Adams',
            subtitle: 'Account Manager',
            avatar: 'https://picsum.photos/500/500?people'
        },
        groups: [
            {
                title: 'Contact Details',
                items: [
                    {
                        label: 'Mobile',
                        value: '+1 605 555 5555'
                    },
                    {
                        label: 'Phone',
                        value: '+1 316 555 5555'
                    },
                    {
                        label: 'Email',
                        value: 'michael_adams@example.com'
                    }
                ]
            },
            {
                title: 'Company',
                items: [
                    {
                        label: 'Name',
                        value: 'Company A'
                    },
                    {
                        label: 'Address',
                        value: '718 Main Street, Anytown, SD 57401, USA'
                    }
                ]
            }
        ]
    };
}

describe('QuickViewComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign id', () => {
        const quickViewContainer = fixture.debugElement.query(By.css('.fd-quick-view'));

        expect(quickViewContainer.nativeElement.id).toEqual(component.data.id);
    });
});
