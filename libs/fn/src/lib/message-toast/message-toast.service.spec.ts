import { OverlayContainer } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MessageToastConfig } from './config/message-toast.config';

import { MESSAGE_TOAST_DATA } from './constants/message-toast.token';
import { MessageToastModule } from './message-toast.module';

import { MessageToastService } from './message-toast.service';

const testMessage = 'Test message';

const messageToastTextSelector = '.fn-message-toast__text';

class DummySpyClass {
    spy(): void {}
}

const dummySpy = new DummySpyClass();

@Component({
    template: `{{ data.message }}`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageToastComponentExampleComponent {
    constructor(@Inject(MESSAGE_TOAST_DATA) public data: any) {}
}

@Component({
    template: `
        <ng-template let-messageToast #template>
            {{ messageToast.data.message }}
        </ng-template>
    `,
    providers: [MessageToastService]
})
class ComponentThatProvidesMessageToastComponent {
    @ViewChild('template')
    template!: TemplateRef<any>;

    constructor(public service: MessageToastService) {}
}

describe('MessageToastService', () => {
    let overlayContainerElement: HTMLElement;
    let component: ComponentThatProvidesMessageToastComponent;
    let fixture: ComponentFixture<ComponentThatProvidesMessageToastComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MessageToastModule, CommonModule, NoopAnimationsModule],
            declarations: [ComponentThatProvidesMessageToastComponent, MessageToastComponentExampleComponent]
        }).compileComponents();
    });

    beforeEach(inject([OverlayContainer], (overlay: OverlayContainer) => {
        overlayContainerElement = overlay.getContainerElement();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ComponentThatProvidesMessageToastComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should display message toast', async () => {
        component.service.open(testMessage);

        fixture.detectChanges();
        await fixture.whenRenderingDone();

        const messageToastMessageElm = overlayContainerElement.querySelector(messageToastTextSelector) as HTMLElement;

        expect(messageToastMessageElm.innerText.trim()).toEqual(testMessage);
    });

    it('should dismiss message toast', fakeAsync(() => {
        const ref = component.service.open(testMessage, {
            duration: 0
        });

        fixture.detectChanges();

        const dismissCompleteSpy = spyOn(dummySpy, 'spy');

        ref.containerInstance.onExit$.subscribe({ complete: dismissCompleteSpy });

        ref.dismiss();

        tick(500);

        expect(dismissCompleteSpy).toHaveBeenCalled();
    }));

    it('should dismiss message toast automatically', fakeAsync(() => {
        const ref = component.service.open(testMessage, {
            duration: 2000
        });

        fixture.detectChanges();

        const dismissCompleteSpy = spyOn(dummySpy, 'spy');

        ref.afterDismissed().subscribe({ complete: dismissCompleteSpy });

        tick(3000);

        expect(dismissCompleteSpy).toHaveBeenCalled();
    }));

    it('should open message toast from template ref', async () => {
        const ref = component.service.openFromTemplate(component.template, {
            maxWidth: 200,
            truncate: true,
            data: {
                message: testMessage
            }
        });

        fixture.detectChanges();

        await fixture.whenRenderingDone();

        const messageToastMessageElm = overlayContainerElement.querySelector(messageToastTextSelector) as HTMLElement;

        expect(ref.containerInstance.config.data.message).toEqual(testMessage);
        expect(messageToastMessageElm.innerText.trim()).toEqual(testMessage);
    });

    it('should open message toast from component', async () => {
        const config: MessageToastConfig = {
            data: {
                message: testMessage
            }
        };

        const ref = component.service.openFromComponent(MessageToastComponentExampleComponent, config);

        fixture.detectChanges();

        await fixture.whenRenderingDone();

        const messageToastMessageElm = overlayContainerElement.querySelector(messageToastTextSelector) as HTMLElement;

        expect(ref.containerInstance.config.data.message).toEqual(testMessage);
        expect(messageToastMessageElm.innerText.trim()).toEqual(testMessage);
    });
});
