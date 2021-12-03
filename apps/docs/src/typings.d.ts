/* SystemJS module definition */
declare let module: NodeModule;
interface NodeModule {
    id: string;
}
declare module '!raw-loader!*' {
    const contents: {
        default: string;
    };
    export = contents;
}
