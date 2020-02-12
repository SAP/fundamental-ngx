import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TabIconDirective } from './tab-directives';

@Component({
    template: `
        <li fd-tab-icon #directiveElement>
        </li>
    `
})
class TestNestedContainerComponent {

    @ViewChild('directiveElement', { static: true, read: TabIconDirective })
    directiveElement: TabIconDirective;

}

describe('TabIconDirective', () => {
    let component: TestNestedContainerComponent;
    let directiveElement: TabIconDirective;
    let fixture: ComponentFixture<TestNestedContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestNestedContainerComponent, TabIconDirective],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestNestedContainerComponent);
        component = fixture.componentInstance;
        directiveElement = component.directiveElement;
        fixture.detectChanges();
    });


    it('Should have good classes', () => {
        directiveElement.icon = 'menu';
        directiveElement.buildComponentCssClass();
        fixture.detectChanges();

        expect((directiveElement as any)._elementRef.nativeElement.classList.contains('fd-tabs__icon')).toBeTruthy();
        expect((directiveElement as any)._elementRef.nativeElement.classList.contains('sap-icon--menu')).toBeTruthy();
    });

    it('Should be able to change icon', () => {


        directiveElement.icon = 'edit';
        directiveElement.buildComponentCssClass();
        fixture.detectChanges();


        directiveElement.icon = 'menu';
        directiveElement.buildComponentCssClass();
        expect((directiveElement as any)._elementRef.nativeElement.classList.contains('sap-icon--menu')).toBeTruthy();
    });
})
