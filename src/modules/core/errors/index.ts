export class HTTPError extends Error {
    name: string;
    request: Request;
    response: Response;
    data: BodyInit | null;

    constructor(request: Request, response: Response, data: BodyInit | null) {
        super(response.statusText || String(response.status ?? 'Unknown response error'));

        this.name = 'HTTPError';
        this.request = request;
        this.response = response;
        this.data = data;
    }
}
