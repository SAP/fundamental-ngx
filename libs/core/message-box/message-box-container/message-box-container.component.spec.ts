import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FD_DIALOG_FOCUS_TRAP_ERROR } from '@fundamental-ngx/core/dialog';

import { whenStable } from '@fundamental-ngx/core/tests';
import { MessageBoxModule } from '../message-box.module';
import { MessageBoxConfig } from '../utils/message-box-config.class';
import { MessageBoxContent } from '../utils/message-box-content.class';
import { MessageBoxRef } from '../utils/message-box-ref.class';
import { MessageBoxContainerComponent } from './message-box-container.component';

@Component({
    template: '<ng-template #template></ng-template>',
    imports: [MessageBoxModule]
})
class TestComponent {
    @ViewChild('template')
    templateRef: TemplateRef<any>;
}

describe('MessageBoxContainerComponent', () => {
    let component: MessageBoxContainerComponent;
    let fixture: ComponentFixture<MessageBoxContainerComponent>;
    let messageBoxRef: MessageBoxRef;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [MessageBoxRef, MessageBoxConfig, { provide: FD_DIALOG_FOCUS_TRAP_ERROR, useValue: true }],
            imports: [TestComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MessageBoxContainerComponent);
        component = fixture.componentInstance;
        messageBoxRef = TestBed.inject(MessageBoxRef);
        component.childContent = {};
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create embedded content from component', () => {
        const creationSpy = jest.spyOn(<any>component, '_createFromComponent');
        component.childContent = TestComponent;

        component['_loadContent']();

        expect(creationSpy).toHaveBeenCalled();
    });

    it('should create embedded content from template', async () => {
        const creationSpy = jest.spyOn(<any>component, '_createFromTemplate');
        const testComponent = TestBed.createComponent(TestComponent);

        await whenStable(testComponent);

        component.childContent = testComponent.componentInstance.templateRef;
        component['_loadContent']();

        expect(creationSpy).toHaveBeenCalled();
    });

    it('should create embedded content from content object', () => {
        const creationSpy = jest.spyOn(<any>component, '_createFromDefaultMessageBox');

        component.childContent = { title: 'title' } as MessageBoxContent;

        component['_loadContent']();

        expect(creationSpy).toHaveBeenCalled();
    });

    describe('animation lifecycle', () => {
        it('should start in void animation state', () => {
            // The signal starts as 'void' before _loadContent runs.
            // Note: beforeEach already called detectChanges + setTimeout fired,
            // so we verify this by creating a fresh component.
            const freshFixture = TestBed.createComponent(MessageBoxContainerComponent);
            const freshComponent = freshFixture.componentInstance;
            freshComponent.childContent = {};

            expect(freshComponent['_animationStateSignal']()).toBe('void');
        });

        it('should transition to visible state after content loads', fakeAsync(() => {
            // Create a fresh component inside fakeAsync so setTimeout is captured
            const freshFixture = TestBed.createComponent(MessageBoxContainerComponent);
            const freshComponent = freshFixture.componentInstance;
            freshComponent.childContent = {};

            freshFixture.detectChanges(); // triggers ngAfterViewInit -> setTimeout
            tick(); // processes setTimeout -> _loadContent -> sets 'visible'

            expect(freshComponent['_animationStateSignal']()).toBe('visible');
        }));

        it('should transition to hidden state when message box is dismissed', fakeAsync(() => {
            const freshFixture = TestBed.createComponent(MessageBoxContainerComponent);
            const freshComponent = freshFixture.componentInstance;
            const freshRef = TestBed.inject(MessageBoxRef);
            freshComponent.childContent = {};

            freshFixture.detectChanges();
            tick(); // state becomes 'visible'

            freshRef.dismiss();
            freshFixture.detectChanges();
            tick();

            expect(freshComponent['_animationStateSignal']()).toBe('hidden');
        }));

        it('should transition to hidden state when message box is closed', fakeAsync(() => {
            const freshFixture = TestBed.createComponent(MessageBoxContainerComponent);
            const freshComponent = freshFixture.componentInstance;
            const freshRef = TestBed.inject(MessageBoxRef);
            freshComponent.childContent = {};

            freshFixture.detectChanges();
            tick();

            freshRef.close('result');
            freshFixture.detectChanges();
            tick();

            expect(freshComponent['_animationStateSignal']()).toBe('hidden');
        }));

        it('should emit _endClose$ when message box is closed', fakeAsync(() => {
            const freshFixture = TestBed.createComponent(MessageBoxContainerComponent);
            freshFixture.componentInstance.childContent = {};
            const freshRef = TestBed.inject(MessageBoxRef);

            freshFixture.detectChanges();
            tick();

            const endCloseSpy = jest.fn();
            freshRef._endClose$.subscribe(endCloseSpy);

            freshRef.close('result');

            expect(endCloseSpy).toHaveBeenCalled();
        }));

        it('should emit _endClose$ when message box is dismissed', fakeAsync(() => {
            const freshFixture = TestBed.createComponent(MessageBoxContainerComponent);
            freshFixture.componentInstance.childContent = {};
            const freshRef = TestBed.inject(MessageBoxRef);

            freshFixture.detectChanges();
            tick();

            const endCloseSpy = jest.fn();
            freshRef._endClose$.subscribe(endCloseSpy);

            freshRef.dismiss();

            expect(endCloseSpy).toHaveBeenCalled();
        }));

        it('should complete _endClose$ after close', fakeAsync(() => {
            const freshFixture = TestBed.createComponent(MessageBoxContainerComponent);
            freshFixture.componentInstance.childContent = {};
            const freshRef = TestBed.inject(MessageBoxRef);

            freshFixture.detectChanges();
            tick();

            const completeSpy = jest.fn();
            freshRef._endClose$.subscribe({ complete: completeSpy });

            freshRef.close('result');

            expect(completeSpy).toHaveBeenCalled();
        }));
    });
});
