declare const __webpack_init_sharing__: (shareScope: string) => Promise<void>;
declare const __webpack_share_scopes__: { default: string };

type Factory = () => any;

interface Container {
    init(shareScope: string): void;
    get(module: string): Factory;
}

