import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TabIconComponent } from './tab-directives';

@Component({
    template: ` <li fd-tab-icon #directiveElement></li> `
})
class TestNestedContainerComponent {
    @ViewChild('directiveElement', { static: true, read: TabIconComponent })
    directiveElement: TabIconComponent;
}

describe('TabIconComponent', () => {
    let component: TestNestedContainerComponent;
    let directiveElement: TabIconComponent;
    let fixture: ComponentFixture<TestNestedContainerComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestNestedContainerComponent, TabIconComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestNestedContainerComponent);
        component = fixture.componentInstance;
        directiveElement = component.directiveElement;
        fixture.detectChanges();
    });

    it('Should have good classes', () => {
        directiveElement.buildComponentCssClass();
        fixture.detectChanges();

        expect((directiveElement as any)._elementRef.nativeElement.classList.contains('fd-tabs__icon')).toBeTruthy();
    });
});
