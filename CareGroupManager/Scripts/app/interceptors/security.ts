module Interceptors {
    export function securityInterceptor($q: ng.IQService, userSession: Services.UserSession) {
        return {
            request: (config: ng.IRequestConfig) => {

                if (userSession.token) {
                    angular.extend(config.headers, {
                        Authorization: 'Bearer ' + userSession.token
                    });
                }

                return config;
            },
            requestError: rejection => {
                return $q.reject(rejection);
            },
            response: response => response,
            responseError: rejection => {
                return $q.reject(rejection);
            }
        };
    }

    securityInterceptor.$inject = ['$q', 'userSession'];

    angular.module('care-group')
        .factory('securityInterceptor', securityInterceptor);
}