import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TabsModule } from '../tabs.module';
import { TabIconComponent } from './tab-directives';

@Component({
    template: ` <li fd-tab-icon #directiveElement></li> `,
    standalone: true,
    imports: [TabsModule]
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
            imports: [TestNestedContainerComponent]
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

        expect((directiveElement as any).elementRef.nativeElement.classList.contains('fd-tabs__icon')).toBeTruthy();
    });
});
