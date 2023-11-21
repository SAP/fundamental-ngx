import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Component, ElementRef, ViewChild } from '@angular/core';
import { IconComponent } from '@fundamental-ngx/core/icon';
import {
    ListGroupHeaderDirective,
    ListNavigationItemArrowDirective,
    ListNavigationItemComponent,
    ListNavigationItemTextDirective,
    ListTitleDirective
} from '@fundamental-ngx/core/list';
import { VerticalNavigationGroupHeaderDirective } from './vertical-navigation-group-header.directive';
import { VerticalNavigationComponent } from './vertical-navigation.component';

@Component({
    selector: 'fd-test-vertical-navigation',
    template: `
        <fd-vertical-navigation [condensed]="true" #nav>
            <li fd-list-navigation-item #item>
                <fd-icon glyph="home"></fd-icon>
                <span fd-list-navigation-item-text> Overview </span>
            </li>
            <li fd-list-navigation-item>
                <fd-icon glyph="calendar"></fd-icon>
                <span fd-list-navigation-item-text> Calendar </span>
                <button fd-list-navigation-item-arrow></button>
                <ul fd-list>
                    <li fd-list-navigation-item>
                        <span fd-list-navigation-item-text>Second level item 1</span>
                    </li>
                    <li fd-list-navigation-item [indicated]="true">
                        <span fd-list-navigation-item-text>Second level item 2</span>
                    </li>
                </ul>
            </li>
            <li fd-list-navigation-item>
                <fd-icon glyph="customer"></fd-icon>
                <span fd-list-navigation-item-text> Customers </span>
            </li>
            <li fd-list-navigation-item>
                <fd-icon glyph="shipping-status"></fd-icon>
                <span fd-list-navigation-item-text> Deliveries </span>
            </li>
            <li fd-list-group-header fd-vertical-navigation-group-header>
                <span fd-list-title>Employee Services</span>
            </li>
        </fd-vertical-navigation>
    `,
    standalone: true,
    imports: [
    VerticalNavigationComponent,
    IconComponent,
    ListNavigationItemComponent,
    ListNavigationItemTextDirective,
    ListGroupHeaderDirective,
    VerticalNavigationGroupHeaderDirective,
    ListTitleDirective,
    ListNavigationItemArrowDirective
]
})
class TestVerticalNavigationComponent {
    @ViewChild('objectRef', { read: ElementRef })
    verticalNavigationElementRef: ElementRef;
    @ViewChild('nav')
    nav: VerticalNavigationComponent;
    @ViewChild('item')
    item: ListNavigationItemComponent;
}

describe('VerticalNavigationComponent', () => {
    let component: TestVerticalNavigationComponent;
    let fixture: ComponentFixture<TestVerticalNavigationComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestVerticalNavigationComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestVerticalNavigationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should create', () => {
        expect(component).toBeTruthy();
    });

    it('should handle ngAfterContentInit', () => {
        component.nav.ngAfterContentInit();
        expect(component.item._condensed).toBeTruthy();
    });
});
