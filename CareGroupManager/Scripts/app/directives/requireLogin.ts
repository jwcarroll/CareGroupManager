module Directives {
    function requireLoginDirective(userSession:Services.UserSession) {
        return {
            restrict: 'A',
            link: (scope: ng.IScope, elem: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
                if (!userSession.isLoggedIn()) {
                    elem.hide();
                }

                scope.$on(Services.AccountService.LoginSuccessEvent, event => {
                    elem.show();
                });

                scope.$on(Services.AccountService.LoginFailedEvent, event => {
                    elem.hide();
                });

                scope.$on(Services.AccountService.LogoutSuccessEvent, event => {
                    elem.hide();
                });
            }
        }
    }

    requireLoginDirective.$inject = ['userSession'];

    angular.module('care-group')
        .directive('cgRequireLogin', requireLoginDirective);
} 