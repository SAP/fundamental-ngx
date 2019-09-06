/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
    id: string;
}
declare module '!raw-loader!*' {
    const contents: string;
    export = contents;
}
