import { TabItemDirective } from './tab-item.directive';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

@Component({
    template: ` <li fd-tab-item #directiveElement></li> `
})
class TestNestedContainerComponent {
    @ViewChild('directiveElement', { static: true, read: TabItemDirective })
    directiveElement: TabItemDirective;
}

describe('TabItemDirective', () => {
    let component: TestNestedContainerComponent;
    let directiveElement: TabItemDirective;
    let fixture: ComponentFixture<TestNestedContainerComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestNestedContainerComponent, TabItemDirective]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestNestedContainerComponent);
        component = fixture.componentInstance;
        directiveElement = component.directiveElement;
        fixture.detectChanges();
    });

    it('Should have good classes', () => {
        directiveElement.header = true;
        directiveElement.tabItemState = 'success';
        directiveElement.buildComponentCssClass();
        fixture.detectChanges();

        expect((directiveElement as any)._elementRef.nativeElement.classList.contains('fd-tabs__item')).toBeTruthy();
        expect(
            (directiveElement as any)._elementRef.nativeElement.classList.contains('fd-tabs__item--header')
        ).toBeTruthy();
        expect(
            (directiveElement as any)._elementRef.nativeElement.classList.contains('fd-tabs__item--success')
        ).toBeTruthy();
    });

    it('Should have good classes', () => {
        directiveElement.header = false;
        directiveElement.tabItemState = null;
        directiveElement.buildComponentCssClass();
        fixture.detectChanges();

        expect((directiveElement as any)._elementRef.nativeElement.classList.contains('fd-tabs__item')).toBeTruthy();
        expect(
            (directiveElement as any)._elementRef.nativeElement.classList.contains('fd-tabs__item--header')
        ).toBeFalsy();
        expect(
            (directiveElement as any)._elementRef.nativeElement.classList.contains('fd-tabs__item--success')
        ).toBeFalsy();
    });
});
