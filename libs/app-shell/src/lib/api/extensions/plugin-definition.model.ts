import {
    TemplateRef,
    Type
} from '@angular/core';
import { Subject } from 'rxjs';

export interface PluginDescriptor {
    provider: string
    version: string;
    sinceVersion: string;
    untilVersion: string;
    remoteEntry: string;
    remoteName: string;
    exposedModule: string;
    displayName: string;
    componentName: string;

    type: Scope;
    category: string;
    hasRoutes: boolean;
    changeNotes: string;
}


export enum Scope {
    Application = 1,
    Page
}


export interface PluginConfiguration {
    getAngularVersionCompatibility(): string

    /**
     * Extensions should be a way to add new functionality different parts of the
     * AppShell. ShellBar, Footer, Different part of headers?
     *
     *
     */
    addExtensions(): Array<Extension>


    /**
     * We allow other plugins to extends functionality of this plugin, when extension points is
     * supported
     */
    addExtensionPoints(): Array<ExtensionPoints>


    /**
     * We allow other plugins to extends functionality of this plugin, when extension points is
     * supported
     */
    addAction(): Array<Action>


    /**
     *
     *  This could be a way to define different listeners
     *
     */
    addListeners(): Array<Listener>

}


/**
 * should be expose TemplateRef?
 */
export class Extension {

    constructor(public id: string,
                public templateRef?: TemplateRef<any>,
                public implClass?: Type<any>) {
    }

}


/**
 *
 */
export class ExtensionPoints {

    constructor(public name: string,
                public scope: Scope,
                public epClass?: Type<any>) {
    }

}


/**
 * Also define some keyboard shortcuts?
 *
 * We could also have override action that override some of the default
 * action from shellbar ?
 */
export class Action {

    constructor(public name: string,
                /**
                 * What about i18n, should be the registering apps responsible for add right label?
                 * based on locale
                 */
                public label: string,
                public description: string,
                public localeID: string,
                public actionGroupId: string,
                // we expect SAP Icons are going to be used
                public icon?: string,
                // shoudl this be a subject or regular class that implements e.g. some OnAction Interface
                onClick?: Subject<any>
    ) {
    }

}

/**
 * It could return list of listeners that we would automatically subscribed. This way we can also
 * control some security policy.
 *
 * Now we have solved the listening what about pushing they still need a Publisher.
 *
 */
export class Listener {

    constructor(public name: string,
                /**
                 * What about i18n, should be the registering apps responsible for add right label?
                 * based on locale
                 */
                public topic: string,
                handler: Subject<any>
    ) {
    }
}
