import {
    waitForAsync,
    fakeAsync,
    ComponentFixture,
    TestBed,
    flushMicrotasks
} from '@angular/core/testing';

import { BrowserModule } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { LookupItem, LookupService } from '../../api/plugins/lookup/lookup.service';
import { PluginPageLauncherComponent } from './plugin-page-launcher.component';

// mock providers
const mockActivatedRouteParams = {
    paramMap: of({
        get: () => {
            return {
                'remote-route': "/entry/to/module"
            };
        }
    })
};

const iframePluginDescriptor: LookupItem = {
    id: 'iframeApp',
    attributes: new Map(),
    version: '1.0',
    descriptor: null,
    module: null
}

describe('PluginPageLauncherComponent', () => {
    let component: PluginPageLauncherComponent;
    let fixture: ComponentFixture<PluginPageLauncherComponent>;
    let lookupService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserModule
            ],
            declarations: [
                PluginPageLauncherComponent,
            ],
            providers: [
                ChangeDetectorRef,
                { provide: ActivatedRoute, useValue: mockActivatedRouteParams },
                LookupService,
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PluginPageLauncherComponent);
        component = fixture.componentInstance;
        lookupService = fixture.debugElement.injector.get(LookupService);
    });

    it('should create', () => {
        expect(component).toBeDefined();
    });

    it('should not find routing module with id `/entry/to/module`', () => {
        const spyEmit = spyOn(component.error, 'emit');

        spyOn(lookupService, 'lookup').and.returnValue(undefined);

        component.ngOnInit();
        fixture.detectChanges();
        expect(spyEmit).toHaveBeenCalled();
    });

    it('should emit an error from fake PluginLauncherComponent', () => {
        const spyEmit = spyOn(component.error, 'emit');

        component.dispatchError(new Error('Error'));
        fixture.detectChanges();
        expect(spyEmit).toHaveBeenCalled();
    });
});
