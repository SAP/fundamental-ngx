import {
    TemplateRef,
    Type
} from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from '../../events/message-bus';


export interface PluginConfiguration {

    getName(): string

    /**
     * Should this be permissions? for now let's keep it simple
     *
     * Is it ok for plugin to give us permission, or should we have some other service that assign permission and based
     * on plugin ID, we retrieve permission?
     *
     */
    getPermission(): Permission;

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

    constructor(public topic: string,
                public description: string,
                public onMessage: (message: Message) => any,
                public messageSelector?: (msg: Message) => boolean
    ) {
    }
}


export class Permission {

    constructor(public themingChange: boolean = true,
                public changeTitle: boolean = false,
                public talkToAppShell: boolean = false,
                public propagateErrors: boolean = false,
                public readGlobalState: boolean = false,
                public createCustomTopic: boolean = false
    ) {
    }

}
