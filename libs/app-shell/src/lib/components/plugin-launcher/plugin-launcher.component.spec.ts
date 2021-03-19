import {
    waitForAsync,
    fakeAsync,
    ComponentFixture,
    TestBed,
    flushMicrotasks
} from '@angular/core/testing';

import { BrowserModule } from '@angular/platform-browser';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
import {
    NO_ERRORS_SCHEMA,
    ChangeDetectorRef,
    Compiler,
    ElementRef,
    Renderer2,
    SimpleChange
} from '@angular/core';

import { MessagingTopics } from '../../api/events/topics.service';
import { MessagingService } from '../../api/events/messaging.service';
import { LookupItem, LookupService } from '../../api/plugins/lookup/lookup.service';
import { PluginManagerService } from '../../api/plugins/plugin-manager.service';
import { DescriptorsModule } from '../../api/public_api';
import { PluginLauncherComponent } from './plugin-launcher.component';

// Mock providers, values and functions
class MockElementRef extends ElementRef {
    nativeElement = document.createElement('iframe');
}

const iframePluginDescriptor: LookupItem = {
    id: 'iframeApp',
    attributes: new Map(),
    version: '1.0',
    descriptor: {
        name: 'IframeModule',
        version: '1.0',
        uri: 'https://www.google.com/',
        modules: [{
            name: 'unknown-iframe',
            type: 'iframe',
            html: 'index.html'
        }]
    },
    module: null
}

const customElementPluginDescriptor: LookupItem = {
    id: 'customElementApp',
    attributes: new Map(),
    version: '1.0',
    descriptor: {
        name: 'CustomElementModule',
        version: '1.0',
        uri: 'remoteEntry1.js',
        modules: [{
            name: 'unknown-custom-element',
            type: 'custom-element',
            exposedModule: 'CustomElementExposedModule',
            componentName: 'CustomElementComponent'
        }]
    },
    module: null
}

const componentPluginDescriptor: LookupItem = {
    id: 'componentElementApp',
    attributes: new Map(),
    version: '1.0',
    descriptor: {
        name: 'ComponentModule',
        version: '1.0',
        uri: 'remoteEntry2.js',
        modules: [{
            name: 'unknown-component',
            type: 'angular-ivy-component',
            exposedModule: 'ComponentModule'
        }]
    },
    module: null
}

function loadRemoteModule(remoteEntry: string, module: DescriptorsModule, succeed = false): Promise<DescriptorsModule> {
    if (succeed) {
        return Promise.resolve(module);
    }

    return Promise.reject(
        new Error(
            `ModuleRemoteLoadingError: Can't fetch a remote module from ${remoteEntry}`
        )
    );
};
//

describe('PluginLauncherComponent', () => {
    let component: PluginLauncherComponent;
    let fixture: ComponentFixture<PluginLauncherComponent>;
    let lookupService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserModule
            ],
            declarations: [
                PluginLauncherComponent,
            ],
            providers: [
                { provide: ElementRef, useClass: MockElementRef },
                LookupService,
                ChangeDetectorRef,
                Renderer2,
                Compiler,
                NgxPubSubService,
                MessagingTopics,
                MessagingService,
                PluginManagerService,
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PluginLauncherComponent);
        component = fixture.componentInstance;
        lookupService = fixture.debugElement.injector.get(LookupService)
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeDefined();
    });

    it('should not load iframe plugin module', () => {
        const spyEmit = spyOn(component.error, 'emit');

        component.onLoadIframeError();
        fixture.detectChanges();
        expect(spyEmit).toHaveBeenCalled();
    });

    it('should not find iframe plugin module with name `unknown-iframe1`', () => {
        const spyEmit = spyOn(component.error, 'emit');

        spyOn(lookupService, 'lookup').and.returnValue(iframePluginDescriptor);

        component.name = 'IframeModule';
        component.module = 'unknown-iframe1';

        component.ngOnChanges({
            name: new SimpleChange(undefined, component.name, false),
            module: new SimpleChange(undefined, component.module, false)
        });

        fixture.detectChanges();
        expect(spyEmit).toHaveBeenCalled();
    });

    it('should not find plugin module with name `unknown-custom-element1`', () => {
        const spyEmit = spyOn(component.error, 'emit');

        spyOn(lookupService, 'lookup').and.returnValue(customElementPluginDescriptor);

        component.name = 'CustomElementModule';
        component.module = 'unknown-custom-element1';

        component.ngOnChanges({
            name: new SimpleChange(undefined, component.name, false),
            module: new SimpleChange(undefined, component.module, false)
        });

        fixture.detectChanges();
        expect(spyEmit).toHaveBeenCalled();
    });

    it('should not load remote module with name `unknown-custom-element` by remote entry', fakeAsync(() => {
        const spyEmit = spyOn(component.error, 'emit');

        spyOn(lookupService, 'lookup').and.returnValue(customElementPluginDescriptor);

        spyOn(component, 'loadRemoteModule').and.returnValue(
            // reject loading
            loadRemoteModule(
                customElementPluginDescriptor.descriptor.uri,
                customElementPluginDescriptor.descriptor.modules[0]
            )
        );

        component.name = 'CustomElementModule';
        component.module = 'unknown-custom-element';

        component.ngOnChanges({
            name: new SimpleChange(undefined, component.name, false),
            module: new SimpleChange(undefined, component.module, false)
        });

        flushMicrotasks();

        fixture.detectChanges();
        expect(spyEmit).toHaveBeenCalled();
    }));

    it('should not resolve loaded remote module with name `unknown-custom-element`', fakeAsync(() => {
        const spyEmit = spyOn(component.error, 'emit');

        spyOn(lookupService, 'lookup').and.returnValue(customElementPluginDescriptor);

        spyOn(component, 'loadRemoteModule').and.returnValue(
            // resolve loading
            loadRemoteModule(
                customElementPluginDescriptor.descriptor.uri,
                customElementPluginDescriptor.descriptor.modules[0],
                true
            )
        );

        component.name = 'CustomElementModule';
        component.module = 'unknown-custom-element';

        component.ngOnChanges({
            name: new SimpleChange(undefined, component.name, false),
            module: new SimpleChange(undefined, component.module, false)
        });

        flushMicrotasks();

        fixture.detectChanges();
        expect(spyEmit).toHaveBeenCalled();
    }));

    it('should not find plugin module with name `unknown-component1`', () => {
        const spyEmit = spyOn(component.error, 'emit');

        spyOn(lookupService, 'lookup').and.returnValue(componentPluginDescriptor);

        component.name = 'ComponentModule';
        component.module = 'unknown-component1';

        component.ngOnChanges({
            name: new SimpleChange(undefined, component.name, false),
            module: new SimpleChange(undefined, component.module, false)
        });

        fixture.detectChanges();
        expect(spyEmit).toHaveBeenCalled();
    });

    it('should not load remote module with name `unknown-component` by remote entry', fakeAsync(() => {
        const spyEmit = spyOn(component.error, 'emit');

        spyOn(lookupService, 'lookup').and.returnValue(componentPluginDescriptor);

        spyOn(component, 'loadRemoteModule').and.returnValue(
            // reject loading
            loadRemoteModule(
                componentPluginDescriptor.descriptor.uri,
                componentPluginDescriptor.descriptor.modules[0]
            )
        );

        component.name = 'ComponentModule';
        component.module = 'unknown-component';

        component.ngOnChanges({
            name: new SimpleChange(undefined, component.name, false),
            module: new SimpleChange(undefined, component.module, false)
        });

        flushMicrotasks();

        fixture.detectChanges();
        expect(spyEmit).toHaveBeenCalled();
    }));

    it('should not resolve loaded remote module with name `unknown-component`', fakeAsync(() => {
        const spyEmit = spyOn(component.error, 'emit');

        spyOn(lookupService, 'lookup').and.returnValue(componentPluginDescriptor);

        spyOn(component, 'loadRemoteModule').and.returnValue(
            // reject loading
            loadRemoteModule(
                componentPluginDescriptor.descriptor.uri,
                componentPluginDescriptor.descriptor.modules[0],
                true
            )
        );

        component.name = 'ComponentModule';
        component.module = 'unknown-component';

        component.ngOnChanges({
            name: new SimpleChange(undefined, component.name, false),
            module: new SimpleChange(undefined, component.module, false)
        });

        flushMicrotasks();

        fixture.detectChanges();
        expect(spyEmit).toHaveBeenCalled();
    }));
});
