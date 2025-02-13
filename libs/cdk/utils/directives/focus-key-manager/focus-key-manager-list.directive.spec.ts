import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, waitForAsync } from '@angular/core/testing';
import { RtlService } from '../../services/rtl.service';
import { FocusKeyManagerItemDirective } from './focus-key-manager-item.directive';
import { FocusKeyManagerListDirective } from './focus-key-manager-list.directive';

@Component({
    template: `
        <ul fdkFocusKeyManagerList>
            <li fdkFocusKeyManagerItem></li>
        </ul>
    `,
    standalone: true, // Mark TestComponent as standalone
    imports: [FocusKeyManagerItemDirective, FocusKeyManagerListDirective]
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
            imports: [TestComponent],
            providers: [RtlService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should focus element', fakeAsync(() => {
        const focusMock = jest.spyOn(component.item, 'focus' as any);

        component.list.ngAfterContentInit();
        component.list.focusItem(0);

        expect(component.list.focusKeyManager.activeItemIndex).toEqual(0);
        expect(component.list.focusKeyManager.activeItem).toEqual(component.item);
        expect(focusMock).toHaveBeenCalled();
    }));
});
