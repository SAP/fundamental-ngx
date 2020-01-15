/* SystemJS module definition */
declare var module: NodeModule;
declare var $: any;
declare var jQuery: any;
interface NodeModule {
    id: string;
}
declare module '!raw-loader!*' {
    const contents: {
        default: string
    };
    export = contents;
}
