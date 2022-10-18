export interface WithDevServer {
    devServerTarget: string;
}

export interface WithBaseUrl {
    baseUrl: string;
}

export type BaseTestAppOptions = WithDevServer | WithBaseUrl;

export type AffectedTestAppOptions = {
    affected: true;
    base: string;
    head: string;
} & BaseTestAppOptions;

export type UnaffectedTestAppOptions = { affected: false } & BaseTestAppOptions;

export type TestAppOptions = AffectedTestAppOptions | UnaffectedTestAppOptions;
