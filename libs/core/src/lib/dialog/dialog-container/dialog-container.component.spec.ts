import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { DialogContainerComponent } from '../dialog-container/dialog-container.component';
import { DialogConfig } from '../utils/dialog-config.class';
import { DialogRef } from '../utils/dialog-ref.class';
import { DialogDefaultContent } from '../utils/dialog-default-content.class';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { whenStable } from '@fundamental-ngx/core/tests';
import { PortalModule } from '@angular/cdk/portal';
import { DialogModule } from '../dialog.module';

const TEXT_CONTENT = 'Hello there';

@Component({
    selector: 'fd-content-test-component',
    template: TEXT_CONTENT
})
class ContentTestComponent {}

describe('DialogContainerComponent', () => {
    let component: DialogContainerComponent;
    let fixture: ComponentFixture<DialogContainerComponent>;
    const dialogConfig = { ...new DialogConfig(), componentClass: 'test-class' };

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, PortalModule, DialogModule],
            declarations: [ContentTestComponent],
            providers: [
                { provide: DialogConfig, useValue: dialogConfig },
                { provide: DialogRef, useClass: DialogRef }
            ]
        });
    }));

    beforeEach(waitForAsync(() => {
        fixture = TestBed.createComponent(DialogContainerComponent);
        component = fixture.componentInstance;
        component.childContent = ContentTestComponent;
    }));

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should create embedded content', async () => {
        await whenStable(fixture);

        const childComponentEl = fixture.nativeElement.querySelector('fd-content-test-component');
        expect(childComponentEl).toBeTruthy();
        expect(childComponentEl.textContent).toContain(TEXT_CONTENT);
    });

    it('should create component from object', async () => {
        component.childContent = { title: TEXT_CONTENT } as DialogDefaultContent;
        const embedContentSpy = jest.spyOn(component as any, '_createFromDefaultDialog');

        await whenStable(fixture);

        expect(embedContentSpy).toHaveBeenCalled();
    });
});
