export interface Options {
    trigger?: string;
    time?: number;
    stagger?: number;
}

export interface SizeOptions extends Options {
    start?: string;
    end?: string;
    ease?: string;
}
