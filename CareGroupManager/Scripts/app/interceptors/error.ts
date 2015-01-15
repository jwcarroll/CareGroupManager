module Interceptors {

    var defaultErrorMsg = 'Hmm... something went wrong.';

    export function errorInterceptor($q: ng.IQService, $rootScope: ng.IRootScopeService) {
        function shouldShowNotification(rejection) {
            return rejection &&
                rejection.config &&
                !rejection.config.supressNotification;
        }

        function showNotification(rejection) {
            var notification: CareGroup.INotification = {
                type: CareGroup.AlertType.danger,
                message: rejection.data.error_description ||
                    rejection.data.message ||
                    defaultErrorMsg
            };
            $rootScope.$broadcast('cgm:notification', notification);
        }

        function handleRejection(rejection) {
            if (shouldShowNotification(rejection)) {
                showNotification(rejection);
            }
        }

        return {
            requestError: rejection => {
                handleRejection(rejection);
                return $q.reject(rejection);
            },
            responseError: rejection => {
                handleRejection(rejection);
                return $q.reject(rejection);
            }
        };
    }

    errorInterceptor.$inject = ['$q', '$rootScope'];

    angular.module('care-group')
        .factory('errorInterceptor', errorInterceptor);
} 