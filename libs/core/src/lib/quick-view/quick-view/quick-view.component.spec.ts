import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { QuickViewModule } from '../quick-view.module';
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

            <fd-quick-view-group *ngFor="let group of data.groups">
                <fd-quick-view-group-title>
                    {{ group.title }}
                </fd-quick-view-group-title>
                <fd-quick-view-group-item *ngFor="let item of group.items">
                    <fd-quick-view-group-item-label>
                        {{ item.label }}
                    </fd-quick-view-group-item-label>
                    <fd-quick-view-group-item-content>
                        <ng-container [ngSwitch]="item.label">
                            <a *ngSwitchCase="item.label === 'Mobile' || item.label === 'Phone' ? item.label : ''"
                               [href]="'tel:' + item.value"
                               [innerText]="item.value"
                               fd-link
                            ></a>
                            <a *ngSwitchCase="'Email'" [href]="'mailto:' + item.value" [innerText]="item.value" fd-link></a>
                            <div *ngSwitchDefault [innerText]="item.value"></div>
                        </ng-container>
                    </fd-quick-view-group-item-content>
                </fd-quick-view-group-item>
            </fd-quick-view-group>
        </fd-quick-view>
    `
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
            avatar: 'http://placeimg.com/500/500/people'
        },
        groups: [{
            title: 'Contact Details',
            items: [{
                label: 'Mobile',
                value: '+1 605 555 5555'
            }, {
                label: 'Phone',
                value: '+1 316 555 5555'
            }, {
                label: 'Email',
                value: 'michael_adams@example.com'
            }]
        }, {
            title: 'Company',
            items: [{
                label: 'Name',
                value: 'Company A'
            }, {
                label: 'Address',
                value: '718 Main Street, Anytown, SD 57401, USA'
            }]
        }]
    };
}

describe('QuickViewComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [QuickViewModule]
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
