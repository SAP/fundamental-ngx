/* SystemJS module definition */
declare let module: NodeModule;

interface NodeModule {
    id: string;
}

declare module '*?raw' {
    const contents: string;

    export = contents;
}
