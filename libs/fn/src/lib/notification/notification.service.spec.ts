import { OverlayContainer } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationConfig } from './config/notification-config';
import { NOTIFICATION_DATA } from './constants/notification-data.token';
import { NotificationModule } from './notification.module';

import { NotificationService } from './notification.service';

const testTitle = 'Test title';
const testMessage = 'Test message';

const notificationTitleSelector = '.fn-notification__title';
const notificationMessageSelector = '.fn-notification__text';

class DummySpyClass {
    spy(): void {}
}

const dummySpy = new DummySpyClass();

@Component({
    template: `
        <fn-notification-content>
            <ng-template fnNotificationTitle>{{ notification.title }}</ng-template>
            <ng-template fnNotificationText>{{ notification.message }}</ng-template>
        </fn-notification-content>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponentExampleComponent {
    constructor(@Inject(NOTIFICATION_DATA) public notification: any) {}
}

@Component({
    template: `
        <ng-template let-notification #template let-notificationRef="toastRef">
            <fn-notification-content>
                <ng-template fnNotificationTitle>{{ notification.title }}</ng-template>
                <ng-template fnNotificationText>{{ notification.message }}</ng-template>
            </fn-notification-content>
        </ng-template>
    `,
    providers: [NotificationService]
})
class ComponentThatProvidesMessageToastComponent {
    @ViewChild('template')
    template!: TemplateRef<any>;

    constructor(public service: NotificationService) {}
}

describe('NotificationService', () => {
    let overlayContainerElement: HTMLElement;
    let component: ComponentThatProvidesMessageToastComponent;
    let fixture: ComponentFixture<ComponentThatProvidesMessageToastComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NotificationModule, CommonModule, NoopAnimationsModule],
            declarations: [ComponentThatProvidesMessageToastComponent, NotificationComponentExampleComponent]
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

    it('should display notification', async () => {
        component.service.open({
            title: testTitle,
            message: testMessage
        });

        fixture.detectChanges();
        await fixture.whenRenderingDone();

        const notificationTitleElm = overlayContainerElement.querySelector(notificationTitleSelector) as HTMLElement;
        const notificationMessageElm = overlayContainerElement.querySelector(
            notificationMessageSelector
        ) as HTMLElement;

        expect(notificationTitleElm.innerText.trim()).toEqual(testTitle);
        expect(notificationMessageElm.innerText.trim()).toEqual(testMessage);
    });

    it('should dismiss notification', fakeAsync(() => {
        const ref = component.service.open({
            title: testTitle,
            message: testMessage,
            duration: 0
        });

        fixture.detectChanges();

        const dismissCompleteSpy = jest.spyOn(dummySpy, 'spy');

        ref.containerInstance.onExit$.subscribe({ complete: dismissCompleteSpy });

        ref.dismiss();

        tick(500);

        expect(dismissCompleteSpy).toHaveBeenCalled();
    }));

    it('should dismiss notification automatically', fakeAsync(() => {
        const ref = component.service.open({
            title: testTitle,
            message: testMessage,
            duration: 2000
        });

        fixture.detectChanges();

        const dismissCompleteSpy = jest.spyOn(dummySpy, 'spy');

        ref.afterDismissed().subscribe({ complete: dismissCompleteSpy });

        tick(3000);

        expect(dismissCompleteSpy).toHaveBeenCalled();
    }));

    it('should open notification from template ref', async () => {
        component.service.openFromTemplate(component.template, {
            title: testTitle,
            message: testMessage
        });

        fixture.detectChanges();

        await fixture.whenRenderingDone();

        const notificationTitleElm = overlayContainerElement.querySelector(notificationTitleSelector) as HTMLElement;
        const notificationMessageElm = overlayContainerElement.querySelector(
            notificationMessageSelector
        ) as HTMLElement;

        expect(notificationTitleElm.innerText.trim()).toEqual(testTitle);
        expect(notificationMessageElm.innerText.trim()).toEqual(testMessage);
    });

    it('should open notification from component', async () => {
        const config: NotificationConfig = {
            title: testTitle,
            message: testMessage
        };

        component.service.openFromComponent(NotificationComponentExampleComponent, config);

        fixture.detectChanges();

        await fixture.whenRenderingDone();

        const notificationTitleElm = overlayContainerElement.querySelector(notificationTitleSelector) as HTMLElement;
        const notificationMessageElm = overlayContainerElement.querySelector(
            notificationMessageSelector
        ) as HTMLElement;

        expect(notificationTitleElm.innerText.trim()).toEqual(testTitle);
        expect(notificationMessageElm.innerText.trim()).toEqual(testMessage);
    });
});
