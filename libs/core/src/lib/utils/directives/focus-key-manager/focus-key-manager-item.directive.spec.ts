import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FocusKeyManagerListDirective } from './focus-key-manager-list.directive';
import { FocusKeyManagerItemDirective } from './focus-key-manager-item.directive';

@Component({
    template: `
        <ul fd-focus-key-manager-list>
            <li #item fd-focus-key-manager-item></li>

            <li #initialFocus fd-focus-key-manager-item initialFocus></li>
        </ul>
    `
})
class TestComponent {
    @ViewChild(FocusKeyManagerListDirective) list: FocusKeyManagerListDirective;
    @ViewChild('initialFocus') initialFocusItem: FocusKeyManagerItemDirective;
    @ViewChild('item') item: FocusKeyManagerItemDirective;
}

describe('FocusKeyManagerItem', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [TestComponent, FocusKeyManagerItemDirective, FocusKeyManagerListDirective]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should set tabindex for initialFocus elements', () => {
        fixture.detectChanges();

        expect(component.initialFocusItem.nativeElement.tabIndex).toBe(0);
        expect(component.item.nativeElement.tabIndex).toBe(-1);
    });
});
