import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ListModule } from '../list.module';
import { ListNavigationItemComponent } from './../list-navigation-item/list-navigation-item.component';
import { IconModule } from '@fundamental-ngx/core/icon';

@Component({
    template: `
        <li fd-list-navigation-item #componentElement>
            <fd-icon glyph="home" #icon></fd-icon>
            <span fd-list-navigation-item-text #text>Calendar</span>
            <button fd-list-navigation-item-arrow #arrow></button>
            <ul fd-list>
                <li fd-list-navigation-item>
                    <span fd-list-navigation-item-text>Second level item 1</span>
                </li>
                <li fd-list-navigation-item [indicated]="true" #indicated>
                    <span fd-list-navigation-item-text>Second level item 2</span>
                </li>
            </ul>
        </li>
    `
})
class TestComponent {
    @ViewChild('componentElement', { read: ElementRef })
    ref: ElementRef;
    @ViewChild('text', { read: ElementRef })
    text: ElementRef;
    @ViewChild('arrow', { read: ElementRef })
    arrow: ElementRef;
    @ViewChild('indicated', { read: ElementRef })
    indicated: ElementRef;
    @ViewChild(ListNavigationItemComponent)
    list: ListNavigationItemComponent;
}

describe('ListNavigationItemComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [ListModule, IconModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign class', () => {
        expect(component.ref.nativeElement.className).toContain('fd-list__navigation-item');
        expect(component.text.nativeElement.className).toContain('fd-list__navigation-item-text');
        expect(component.arrow.nativeElement.className).toContain('fd-list__navigation-item-arrow');
        expect(component.indicated.nativeElement.className).toContain('fd-list__navigation-item--indicated');
    });

    it('should handle ngAfterContentInit', () => {
        component.list.ngAfterContentInit();
        expect(component.list._isExpandable).toBeTruthy();
        expect(component.list._iconComponent._navigationItemIcon).toBeTruthy();
        expect(component.list._innerText).toBe('Calendar');
    });

    it('should handle mouse click', fakeAsync(() => {
        const event = new MouseEvent('click');
        jest.spyOn(event, 'stopPropagation');
        tick();
        component.ref.nativeElement.dispatchEvent(event);
        tick();
        expect(event.stopPropagation).toHaveBeenCalled();
        expect(component.list.expanded).toBeTruthy();
    }));

    it('should handle _childIndicatedAndCollapsed', () => {
        expect(component.list._childIndicatedAndCollapsed()).toBeTruthy();
    });
});
