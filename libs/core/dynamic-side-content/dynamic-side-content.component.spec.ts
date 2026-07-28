import { Component, ViewChild, input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { whenStable } from '@fundamental-ngx/core/tests';
import { DYNAMIC_SIDE_CONTENT_CLASS_NAME, DynamicSideContentPosition, DynamicSideContentSize } from './constants';
import { DynamicSideContentMainComponent } from './dynamic-side-content-main.component';
import { DynamicSideContentSideComponent } from './dynamic-side-content-side.component';
import { DynamicSideContentComponent } from './dynamic-side-content.component';
import { DynamicSideContentModule } from './dynamic-side-content.module';

@Component({
    template: `
        <fd-dynamic-side-content [size]="size()" [position]="position()">
            @if (renderSideFromLeft()) {
                <fd-dynamic-side-content-side>{{ sideTextContent() }}</fd-dynamic-side-content-side>
            }
            <fd-dynamic-side-content-main>{{ mainTextContent() }}</fd-dynamic-side-content-main>
            @if (!renderSideFromLeft()) {
                <fd-dynamic-side-content-side>{{ sideTextContent() }}</fd-dynamic-side-content-side>
            }
        </fd-dynamic-side-content>
    `,
    standalone: true,
    imports: [DynamicSideContentModule]
})
class TestHostComponent {
    @ViewChild(DynamicSideContentComponent) dynamicSideContent: DynamicSideContentComponent;

    readonly position = input<DynamicSideContentPosition>('none');
    readonly size = input<DynamicSideContentSize>('xl');

    readonly sideTextContent = input('SIDE_CONTENT_TEXT');
    readonly mainTextContent = input('MAIN_CONTENT_TEXT');

    readonly renderSideFromLeft = input(true);
}
describe('DynamicSideContent', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let host: TestHostComponent;
    let component: DynamicSideContentComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestHostComponent]
        }).compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(TestHostComponent);
        host = fixture.componentInstance;
        await whenStable(fixture);
        component = host.dynamicSideContent;
    });

    it('should create', () => {
        expect(host).toBeTruthy();
    });

    describe('classNames on host element', () => {
        it('should has binding', () => {
            expect(component.size).toBe(host.size());
        });

        it('should add container', () => {
            const componentDebugEl = fixture.debugElement.query(By.directive(DynamicSideContentComponent));
            expect(componentDebugEl.nativeElement.className.includes(DYNAMIC_SIDE_CONTENT_CLASS_NAME.container)).toBe(
                true
            );
        });

        it('should add modifier for position="equalSplit"', () => {
            fixture.componentRef.setInput('position', 'equalSplit');
            fixture.detectChanges();

            const componentDebugEl = fixture.debugElement.query(By.directive(DynamicSideContentComponent));
            expect(
                componentDebugEl.nativeElement.className.includes(DYNAMIC_SIDE_CONTENT_CLASS_NAME.containerSideEqual)
            ).toBe(true);
        });

        it('should add modifier for position="bottom"', () => {
            fixture.componentRef.setInput('position', 'bottom');
            fixture.detectChanges();

            const componentDebugEl = fixture.debugElement.query(By.directive(DynamicSideContentComponent));
            expect(
                componentDebugEl.nativeElement.className.includes(DYNAMIC_SIDE_CONTENT_CLASS_NAME.containerSideBelow)
            ).toBe(true);
        });

        it('should add modifier for size option', () => {
            const componentDebugEl = fixture.debugElement.query(By.directive(DynamicSideContentComponent));

            fixture.componentRef.setInput('size', 'sm');
            fixture.detectChanges();
            expect(
                componentDebugEl.nativeElement.className.includes(DYNAMIC_SIDE_CONTENT_CLASS_NAME.containerSizeSm)
            ).toBe(true);

            fixture.componentRef.setInput('size', 'md');
            fixture.detectChanges();
            expect(
                componentDebugEl.nativeElement.className.includes(DYNAMIC_SIDE_CONTENT_CLASS_NAME.containerSizeMd)
            ).toBe(true);

            fixture.componentRef.setInput('size', 'lg');
            fixture.detectChanges();
            expect(
                componentDebugEl.nativeElement.className.includes(DYNAMIC_SIDE_CONTENT_CLASS_NAME.containerSizeMd)
            ).toBe(true);

            fixture.componentRef.setInput('size', 'xl');
            fixture.detectChanges();
            expect(
                componentDebugEl.nativeElement.className.includes(DYNAMIC_SIDE_CONTENT_CLASS_NAME.containerSizeXl)
            ).toBe(true);
        });
    });

    it('should render projected content', async () => {
        const componentEl = fixture.debugElement.query(By.directive(DynamicSideContentComponent))
            .nativeElement as HTMLElement;

        expect(componentEl?.innerHTML).toContain(host.sideTextContent());
        expect(componentEl?.innerHTML).toContain(host.mainTextContent());
    });

    describe('positioning', () => {
        it('should has binding', () => {
            expect(component.position).toBe(host.position());
        });

        it('should render side content from the left if projected so', () => {
            fixture.componentRef.setInput('renderSideFromLeft', true); // left side-content projection
            fixture.detectChanges();

            const componentDebugEl = fixture.debugElement.query(By.directive(DynamicSideContentComponent));
            expect(componentDebugEl.children[0].componentInstance).toBeInstanceOf(DynamicSideContentSideComponent);
            expect(componentDebugEl.children[1].componentInstance).toBeInstanceOf(DynamicSideContentMainComponent);
        });

        it('should render side content from the right if projected so', () => {
            fixture.componentRef.setInput('renderSideFromLeft', false); // right side-content projection
            fixture.detectChanges();

            const componentDebugEl = fixture.debugElement.query(By.directive(DynamicSideContentComponent));
            expect(componentDebugEl.children[0].componentInstance).toBeInstanceOf(DynamicSideContentMainComponent);
            expect(componentDebugEl.children[1].componentInstance).toBeInstanceOf(DynamicSideContentSideComponent);
        });

        it('should render side content from the left if position="left"', () => {
            fixture.componentRef.setInput('renderSideFromLeft', false); // right side-content projection
            fixture.componentRef.setInput('position', 'left');
            fixture.detectChanges();

            const componentDebugEl = fixture.debugElement.query(By.directive(DynamicSideContentComponent));
            expect(componentDebugEl.children[0].componentInstance).toBeInstanceOf(DynamicSideContentSideComponent);
            expect(componentDebugEl.children[1].componentInstance).toBeInstanceOf(DynamicSideContentMainComponent);
        });

        it('should render side content from the right if position="right"', () => {
            fixture.componentRef.setInput('renderSideFromLeft', true); // left side-content projection
            fixture.componentRef.setInput('position', 'right');
            fixture.detectChanges();

            const componentDebugEl = fixture.debugElement.query(By.directive(DynamicSideContentComponent));
            expect(componentDebugEl.children[0].componentInstance).toBeInstanceOf(DynamicSideContentMainComponent);
            expect(componentDebugEl.children[1].componentInstance).toBeInstanceOf(DynamicSideContentSideComponent);
        });

        it('should render side content from the right if position="bottom"', () => {
            fixture.componentRef.setInput('renderSideFromLeft', true); // left side-content projection
            fixture.componentRef.setInput('position', 'bottom');
            fixture.detectChanges();

            const componentDebugEl = fixture.debugElement.query(By.directive(DynamicSideContentComponent));
            expect(componentDebugEl.children[0].componentInstance).toBeInstanceOf(DynamicSideContentMainComponent);
            expect(componentDebugEl.children[1].componentInstance).toBeInstanceOf(DynamicSideContentSideComponent);
        });

        it('should render side content according to projection when position="equalSplit"', () => {
            const componentDebugEl = fixture.debugElement.query(By.directive(DynamicSideContentComponent));

            fixture.componentRef.setInput('position', 'equalSplit');

            fixture.componentRef.setInput('renderSideFromLeft', true); // left side-content projection
            fixture.detectChanges();

            expect(componentDebugEl.children[0].componentInstance).toBeInstanceOf(DynamicSideContentSideComponent);
            expect(componentDebugEl.children[1].componentInstance).toBeInstanceOf(DynamicSideContentMainComponent);

            fixture.componentRef.setInput('renderSideFromLeft', false); // right side-content projection
            fixture.detectChanges();

            expect(componentDebugEl.children[0].componentInstance).toBeInstanceOf(DynamicSideContentMainComponent);
            expect(componentDebugEl.children[1].componentInstance).toBeInstanceOf(DynamicSideContentSideComponent);
        });
    });
});
