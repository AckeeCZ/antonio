type AntonioErrorName = 'AntonioError';
type IsAntonioErrorFlag = true;

export class AntonioError extends Error {
    name: AntonioErrorName;
    request: Request;
    response: Response;
    data: BodyInit | null;
    isAntonioError: IsAntonioErrorFlag;

    constructor(request: Request, response: Response, data: BodyInit | null) {
        super(response.statusText || String(response.status ?? 'Unknown response error'));

        this.name = 'AntonioError';
        this.request = request;
        this.response = response;
        this.data = data;
        this.isAntonioError = true;
    }
}
