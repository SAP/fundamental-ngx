import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
import { ReadableStream } from 'node:stream/web';
import { TextDecoder, TextEncoder } from 'node:util';
import { MessageChannel, MessagePort } from 'node:worker_threads';

Object.assign(globalThis, {
    MessageChannel,
    MessagePort,
    ReadableStream,
    TextDecoder,
    TextEncoder
});

const { Headers, Request, Response, fetch } = require('undici') as typeof import('undici');
Object.assign(globalThis, { fetch, Headers, Request, Response });

setupZoneTestEnv();
