import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { whenStable } from '../utils/tests/when-stable';

import { DynamicSideContentModule } from './dynamic-side-content.module';
import { DynamicSideContentComponent } from './dynamic-side-content.component';
import { DynamicSideContentSideComponent } from './dynamic-side-content-side.component';
import { DynamicSideContentMainComponent } from './dynamic-side-content-main.component';
import { DynamicSideContentPosition, DynamicSideContentSize, CLASS_NAME } from './constants';

@Component({
    template: `
        <fd-dynamic-side-content [size]="size" [position]="position">
            <fd-dynamic-side-content-side *ngIf="renderSideFromLeft">{{ sideTextContent }}</fd-dynamic-side-content-side>
            <fd-dynamic-side-content-main>{{ mainTextContent }}</fd-dynamic-side-content-main>
            <fd-dynamic-side-content-side *ngIf="!renderSideFromLeft">{{ sideTextContent }}</fd-dynamic-side-content-side>
        </fd-dynamic-side-content>
    `
})
class TestHostComponent {
    @ViewChild(DynamicSideContentComponent) dynamicSideContent: DynamicSideContentComponent;

    position: DynamicSideContentPosition = 'none';
    size: DynamicSideContentSize = 'xl';

    sideTextContent = 'SIDE_CONTENT_TEXT';
    mainTextContent = 'MAIN_CONTENT_TEXT';

    renderSideFromLeft = true;
}
describe('DynamicSideContent', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let host: TestHostComponent;
    let component: DynamicSideContentComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, DynamicSideContentModule],
            declarations: [TestHostComponent]
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
            expect(component.size).toBe(host.size);
        });

        it('should add container', () => {
            const componentDebugEl = fixture.debugElement.query(By.directive(DynamicSideContentComponent));
            expect(componentDebugEl.classes[CLASS_NAME.container]).toBeTrue();
        });

        it('should add modifier for position="equalSplit"', () => {
            host.position = 'equalSplit';
            fixture.detectChanges();

            const componentDebugEl = fixture.debugElement.query(By.directive(DynamicSideContentComponent));
            expect(componentDebugEl.classes[CLASS_NAME.containerSideEqual]).toBeTrue();
        });

        it('should add modifier for position="bottom"', () => {
            host.position = 'bottom';
            fixture.detectChanges();

            const componentDebugEl = fixture.debugElement.query(By.directive(DynamicSideContentComponent));
            expect(componentDebugEl.classes[CLASS_NAME.containerSideBelow]).toBeTrue();
        });

        it('should add modifier for size option', () => {
            const componentDebugEl = fixture.debugElement.query(By.directive(DynamicSideContentComponent));

            host.size = 'sm';
            fixture.detectChanges();
            expect(componentDebugEl.classes[CLASS_NAME.containerSizeSm]).toBeTrue();

            host.size = 'md';
            fixture.detectChanges();
            expect(componentDebugEl.classes[CLASS_NAME.containerSizeMd]).toBeTrue();

            host.size = 'lg';
            fixture.detectChanges();
            expect(componentDebugEl.classes[CLASS_NAME.containerSizeMd]).toBeTrue();

            host.size = 'xl';
            fixture.detectChanges();
            expect(componentDebugEl.classes[CLASS_NAME.containerSizeXl]).toBeTrue();
        });
    });

    it('should render projected content', async () => {
        const componentEl = fixture.debugElement.query(By.directive(DynamicSideContentComponent))
            .nativeElement as HTMLElement;

        expect(componentEl?.innerText).toContain(host.sideTextContent);
        expect(componentEl?.innerText).toContain(host.mainTextContent);
    });

    describe('positioning', () => {
        it('should has binding', () => {
            expect(component.position).toBe(host.position);
        });

        it('should render side content from the left if projected so', () => {
            host.renderSideFromLeft = true; // left side-content projection
            fixture.detectChanges();

            const componentDebugEl = fixture.debugElement.query(By.directive(DynamicSideContentComponent));
            expect(componentDebugEl.children[0].componentInstance).toBeInstanceOf(DynamicSideContentSideComponent);
            expect(componentDebugEl.children[1].componentInstance).toBeInstanceOf(DynamicSideContentMainComponent);
        });

        it('should render side content from the right if projected so', () => {
            host.renderSideFromLeft = false; // right side-content projection
            fixture.detectChanges();

            const componentDebugEl = fixture.debugElement.query(By.directive(DynamicSideContentComponent));
            expect(componentDebugEl.children[0].componentInstance).toBeInstanceOf(DynamicSideContentMainComponent);
            expect(componentDebugEl.children[1].componentInstance).toBeInstanceOf(DynamicSideContentSideComponent);
        });

        it('should render side content from the left if position="left"', () => {
            host.renderSideFromLeft = false; // right side-content projection
            host.position = 'left';
            fixture.detectChanges();

            const componentDebugEl = fixture.debugElement.query(By.directive(DynamicSideContentComponent));
            expect(componentDebugEl.children[0].componentInstance).toBeInstanceOf(DynamicSideContentSideComponent);
            expect(componentDebugEl.children[1].componentInstance).toBeInstanceOf(DynamicSideContentMainComponent);
        });

        it('should render side content from the right if position="right"', () => {
            host.renderSideFromLeft = true; // left side-content projection
            host.position = 'right';
            fixture.detectChanges();

            const componentDebugEl = fixture.debugElement.query(By.directive(DynamicSideContentComponent));
            expect(componentDebugEl.children[0].componentInstance).toBeInstanceOf(DynamicSideContentMainComponent);
            expect(componentDebugEl.children[1].componentInstance).toBeInstanceOf(DynamicSideContentSideComponent);
        });

        it('should render side content from the right if position="bottom"', () => {
            host.renderSideFromLeft = true; // left side-content projection
            host.position = 'bottom';
            fixture.detectChanges();

            const componentDebugEl = fixture.debugElement.query(By.directive(DynamicSideContentComponent));
            expect(componentDebugEl.children[0].componentInstance).toBeInstanceOf(DynamicSideContentMainComponent);
            expect(componentDebugEl.children[1].componentInstance).toBeInstanceOf(DynamicSideContentSideComponent);
        });

        it('should render side content according to projection when position="equalSplit"', () => {
            const componentDebugEl = fixture.debugElement.query(By.directive(DynamicSideContentComponent));

            host.position = 'equalSplit';

            host.renderSideFromLeft = true; // left side-content projection
            fixture.detectChanges();

            expect(componentDebugEl.children[0].componentInstance).toBeInstanceOf(DynamicSideContentSideComponent);
            expect(componentDebugEl.children[1].componentInstance).toBeInstanceOf(DynamicSideContentMainComponent);

            host.renderSideFromLeft = false; // right side-content projection
            fixture.detectChanges();

            expect(componentDebugEl.children[0].componentInstance).toBeInstanceOf(DynamicSideContentMainComponent);
            expect(componentDebugEl.children[1].componentInstance).toBeInstanceOf(DynamicSideContentSideComponent);
        });
    });
});
