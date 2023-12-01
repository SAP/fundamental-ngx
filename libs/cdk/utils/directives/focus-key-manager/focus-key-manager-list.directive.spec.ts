import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';

import { FocusKeyManagerListDirective } from './focus-key-manager-list.directive';
import { FocusKeyManagerItemDirective } from './focus-key-manager-item.directive';
import { RtlService } from '../../services/rtl.service';

@Component({
    template: `
        <ul fdkFocusKeyManagerList>
            <li fdkFocusKeyManagerItem></li>
        </ul>
    `
})
class TestComponent {
    @ViewChild(FocusKeyManagerListDirective) list: FocusKeyManagerListDirective;
    @ViewChild(FocusKeyManagerItemDirective) item: FocusKeyManagerItemDirective;
}

describe('FocusKeyManagerList', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [FocusKeyManagerItemDirective, FocusKeyManagerListDirective],
            providers: [RtlService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should focus element', fakeAsync(() => {
        const focusMock = jest.spyOn(component.item, 'focus');

        component.list.ngAfterContentInit();
        component.list.focusItem(0);

        expect(component.list.focusKeyManager.activeItemIndex).toEqual(0);
        expect(component.list.focusKeyManager.activeItem).toEqual(component.item);
        expect(focusMock).toHaveBeenCalled();
    }));
});
