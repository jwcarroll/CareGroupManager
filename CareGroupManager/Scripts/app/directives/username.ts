module Directives {
    function userNameDirective(userSession:Services.UserSession) {
        return {
            restrict: 'E',
            template: '<span></span>',
            scope: {},
            link: (scope: ng.IScope, elem: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
                elem.text(userSession.userName);

                scope.$on(Services.AccountService.LoginSuccessEvent, (event) => {
                    elem.text(userSession.userName);
                });
            }
        };
    }

    userNameDirective.$inject = ['userSession'];

    angular.module('care-group')
        .directive('cgUsername', userNameDirective);
}