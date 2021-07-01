import RequestInterceptorManager from './requestInterceptors';
import ResponseInterceptorManager from './responseInterceptors';

export interface InterceptorManagers {
    request: RequestInterceptorManager;
    response: ResponseInterceptorManager;
}

export * from './requestInterceptors';
export * from './responseInterceptors';
