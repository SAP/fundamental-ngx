import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FD_DIALOG_FOCUS_TRAP_ERROR } from '@fundamental-ngx/core/dialog';

import { whenStable } from '@fundamental-ngx/core/tests';
import { MessageBoxModule } from '../message-box.module';
import { MessageBoxConfig } from '../utils/message-box-config.class';
import { MessageBoxContent } from '../utils/message-box-content.class';
import { MessageBoxRef } from '../utils/message-box-ref.class';
import { MessageBoxContainerComponent } from './message-box-container.component';

@Component({ template: '<ng-template #template></ng-template>' })
class TestComponent {
    @ViewChild('template')
    templateRef: TemplateRef<any>;
}

describe('MessageBoxContainerComponent', () => {
    let component: MessageBoxContainerComponent;
    let fixture: ComponentFixture<MessageBoxContainerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestComponent],
            providers: [MessageBoxRef, MessageBoxConfig, { provide: FD_DIALOG_FOCUS_TRAP_ERROR, useValue: true }],
            imports: [MessageBoxModule, NoopAnimationsModule]
        })
            .overrideModule(BrowserDynamicTestingModule, {
                set: { entryComponents: [TestComponent] }
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MessageBoxContainerComponent);
        component = fixture.componentInstance;
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
});
