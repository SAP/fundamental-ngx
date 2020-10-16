import { LayoutGridColDirective } from './layout-grid-col.directive';
import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

@Component({
    template: `
        <fd-layout-grid>
            <div fdLayoutGridCol="12" fdLayoutGridColMd="6" fdLayoutGridColLg="4" fdLayoutGridColXl="3">
                <example-layout-grid-block>Size: 3</example-layout-grid-block>
            </div>
        </fd-layout-grid>
    `
})
class TestNestedContainerComponent {
    @ViewChild('directiveElement', { static: true, read: LayoutGridColDirective })
    directiveElement: LayoutGridColDirective;
}

describe('LayoutGridColDirective', () => {
    let component: TestNestedContainerComponent;
    let directiveElement: LayoutGridColDirective;
    let fixture: ComponentFixture<TestNestedContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestNestedContainerComponent, LayoutGridColDirective]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestNestedContainerComponent);
        component = fixture.componentInstance;
        directiveElement = component.directiveElement;
        fixture.detectChanges();
    });

    it('Should have good classes', () => {
        fixture.detectChanges();

        expect((directiveElement as any)._elementRef.nativeElement.classList.contains('fd-col--12')).toBeTruthy();
        expect((directiveElement as any)._elementRef.nativeElement.classList.contains('fd-col')).toBeTruthy();
        expect((directiveElement as any)._elementRef.nativeElement.classList.contains('fd-col-md--6')).toBeTruthy();
        expect((directiveElement as any)._elementRef.nativeElement.classList.contains('fd-col-lg--4')).toBeTruthy();
        expect((directiveElement as any)._elementRef.nativeElement.classList.contains('fd-col-xl--3')).toBeTruthy();
    });
});
