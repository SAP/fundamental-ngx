/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
    id: string;
}
declare module '!raw-loader!*' {
    const contents: {
        default: string;
    };
    export = contents;
}
