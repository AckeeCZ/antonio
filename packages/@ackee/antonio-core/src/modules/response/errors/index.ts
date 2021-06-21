type AntonioErrorName = 'AntonioError';
type IsAntonioErrorFlag = true;

export class AntonioError<D> extends Error {
    name: AntonioErrorName;
    request: Request;
    response: Response;
    data: D;
    isAntonioError: IsAntonioErrorFlag;

    constructor(request: Request, response: Response, data: D) {
        super(response.statusText || String(response.status ?? 'Unknown response error'));

        this.name = 'AntonioError';
        this.request = request;
        this.response = response;
        this.data = data;
        this.isAntonioError = true;
    }
}
