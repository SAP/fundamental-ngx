import { MicroProcessFlowFocusableItemDirective } from './micro-process-flow-focusable-item.directive';

import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MicroProcessFlowModule } from './micro-process-flow.module';
import { MicroProcessFlowComponent } from './components/micro-process-flow/micro-process-flow.component';

@Component({
    template: `
        <fd-micro-process-flow>
            <fd-micro-process-flow-item>
                <fd-micro-process-flow-icon
                    fd-micro-process-flow-focusable-item
                    glyph="product"
                ></fd-micro-process-flow-icon>
            </fd-micro-process-flow-item>
        </fd-micro-process-flow>
    `
})
class TestComponent {
    @ViewChild(MicroProcessFlowFocusableItemDirective)
    ref: MicroProcessFlowFocusableItemDirective;

    @ViewChild(MicroProcessFlowComponent)
    microProcessFlowComponent: MicroProcessFlowComponent;
}

describe('MicroProcessFlowFocusableItemDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [MicroProcessFlowModule]
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
        expect(component.ref.elRef.nativeElement).toHaveClass('fd-micro-process-flow__focusable-item');
    });

    it('should assign default tabindex', () => {
        const tabindex = component.ref.elRef.nativeElement.getAttribute('tabindex');
        expect(tabindex).toBe('0');
    });

    it('should assign non-focusable tabindex', () => {
        component.ref.setFocusable(false);
        const tabindex = component.ref.elRef.nativeElement.getAttribute('tabindex');
        expect(tabindex).toBe('-1');
    });

    it('should update focused element index', () => {
        const focusSpy = spyOn(component.ref, 'onFocus').and.callThrough();
        const changeFocusedIndexSpy = spyOn(component.microProcessFlowComponent, 'setFocusedElementIndex');
        component.ref.focus({});
        expect(focusSpy).toHaveBeenCalled();
        expect(changeFocusedIndexSpy).toHaveBeenCalledWith(component.ref.elRef.nativeElement);
    });
});
