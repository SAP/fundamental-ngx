import { readLimitedBody } from '../src/_shared/http';

function requestWithBody(body: ReadableStream<Uint8Array>, headers: HeadersInit = {}): Request {
    return {
        body,
        headers: new Headers(headers),
        arrayBuffer: async () => {
            throw new Error('arrayBuffer must not be used for a bounded body');
        }
    } as Request;
}

describe('readLimitedBody', () => {
    it('stops at the first chunk that crosses the ceiling and cancels without reading the remainder', async () => {
        let pullCount = 0;
        let remainingChunkAllocations = 0;
        let cancelled = false;

        const body = new ReadableStream<Uint8Array>(
            {
                pull(controller) {
                    pullCount += 1;
                    if (pullCount === 1) {
                        controller.enqueue(new Uint8Array([1, 2]));
                        return;
                    }
                    if (pullCount === 2) {
                        controller.enqueue(new Uint8Array([3, 4]));
                        return;
                    }

                    remainingChunkAllocations += 1;
                    controller.error(new Error('the body after the ceiling must not be consumed'));
                },
                cancel() {
                    cancelled = true;
                }
            },
            { highWaterMark: 0 }
        );

        await expect(readLimitedBody(requestWithBody(body), 3)).resolves.toBeNull();

        expect(cancelled).toBe(true);
        expect(remainingChunkAllocations).toBe(0);
    });

    it('uses Content-Length only as an early rejection and does not touch an oversized body stream', async () => {
        let pulled = false;
        const body = {
            getReader() {
                pulled = true;
                throw new Error('Content-Length should reject before reading');
            }
        } as ReadableStream<Uint8Array>;

        await expect(readLimitedBody(requestWithBody(body, { 'content-length': '4' }), 3)).resolves.toBeNull();
        expect(pulled).toBe(false);
    });
});
