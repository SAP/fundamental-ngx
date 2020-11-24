export interface AngularIvyComponentDescriptor {
    /** Uniq name of module in plugin */
    name: string;
    /** Component name we are planning to inject */
    component?: string;
    /** Type of a plugin module */
    type: 'angular-ivy-component';
    /** Exposed Angular Module */
    exposedModule: string;
    /** most likely this property will be removed, but as for this this is a way to register route for a component*/
    route?: string;
}

export interface IframePageDescriptor {
    /** Uniq name of module in plugin */
    name: string;
    /** Type of a plugin module */
    type: 'iframe';
    /** link to html relative to URI, where uri+html should give a valid URL */
    html: string
}

export interface CustomElementDescriptor {
    /** name */
    name: string;
    /** Type of a plugin module */
    type: 'custom-element';
    /** Exposed Angular Module */
    exposedModule: string;
    /** Component name we are planning to inject */
    componentName: string;
}

export type DescriptorsModule = AngularIvyComponentDescriptor
    | IframePageDescriptor
    | CustomElementDescriptor;

export interface PluginDescriptor {
    /** The name of the plugin */
    name: string;
    /** SemVersion of the plugin */
    version: string;
    /** Plugin provider entity (SAP, Ariba, etc. ) */
    provider?: string;
    /** URI to remote entry point, could be remoteEntry.js for Module Federation container
     * or index.html for iframes, etc. */
    uri: string;

    modules: Array<DescriptorsModule>
}
