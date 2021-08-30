import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MicroProcessFlowModule } from '@fundamental-ngx/core/micro-process-flow';
import { MicroProcessFlowComponent } from './micro-process-flow.component';

@Component({
    selector: 'fd-test-micro-process-flow',
    template: `
        <fd-micro-process-flow #microProcessFlow>
            <fd-micro-process-flow-item *ngFor="let item of items">
                <fd-micro-process-flow-icon glyph="product"></fd-micro-process-flow-icon>
            </fd-micro-process-flow-item>
        </fd-micro-process-flow>
    `
})
class TestWrapperComponent {

    @ViewChild('microProcessFlow') microProcessFlow: MicroProcessFlowComponent;

    items = new Array(50);
}

describe('MicroProcessFlowComponent', () => {
    let component: TestWrapperComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
        declarations: [TestWrapperComponent],
        imports: [MicroProcessFlowModule]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should paginate one step further', () => {
        component.microProcessFlow.goNext();
        fixture.detectChanges();

        const previousItemsCount = fixture.nativeElement.querySelector('.fd-micro-process-flow__link-previous span').innerText;
        expect(previousItemsCount).toEqual('1');
        expect(component.microProcessFlow._previousItemsCount).toEqual(1);
    });

    it('should paginate one step back', () => {
        component.microProcessFlow.goNext();
        component.microProcessFlow.goBack();
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('.fd-micro-process-flow__link-previous span')).toBeNull();
        expect(component.microProcessFlow._previousItemsCount).toEqual(0);
    });
});
