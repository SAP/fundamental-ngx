import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FocusKeyManagerItemDirective } from './focus-key-manager-item.directive';
import { FocusKeyManagerListDirective } from './focus-key-manager-list.directive';

@Component({
    standalone: true,
    imports: [FocusKeyManagerItemDirective, FocusKeyManagerListDirective],
    template: `
        <ul fdkFocusKeyManagerList>
            <li #item fdkFocusKeyManagerItem></li>
            <li #initialFocus fdkFocusKeyManagerItem initialFocus></li>
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

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent]
        }).compileComponents();
    }));

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
