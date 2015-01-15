module CareGroup {
    angular.module('care-group', [
            'ngRoute',
            'ngAnimate',
            'ngMessages',
            'LocalStorageModule',
            'ui.bootstrap'
        ])
        .config([
            '$routeProvider', '$httpProvider', (
                $routeProvider: ng.route.IRouteProvider,
                $httpProvider: ng.IHttpProvider) => {

                $routeProvider
                    .when('/care-groups', {
                        templateUrl: '/views/careGroups',
                        controller: 'careGroupCtrl',
                        controllerAs: 'ctrl'
                    })
                    .when('/login', {
                        templateUrl: '/views/login',
                        controller: 'loginCtrl',
                        controllerAs: 'ctrl',
                        anonymous: true
                    })
                    .when('/member-list', {
                        templateUrl: '/views/members',
                        controller: 'membersCtrl',
                        controllerAs: 'ctrl'
                    })
                    .when('/member/:memberId?', {
                        templateUrl: '/views/member',
                        controller: 'memberCtrl',
                        controllerAs: 'ctrl'
                    })
                    .otherwise({
                        redirectTo: '/care-groups'
                    });

                $httpProvider.interceptors.push('securityInterceptor');
                $httpProvider.interceptors.push('errorInterceptor');
            }
        ])
        .run([
            '$rootScope', '$location', 'userSession', (
                $rootScope: ng.IRootScopeService,
                $location: ng.ILocationService,
                userSession: Services.UserSession) => {

                $rootScope.$on('$routeChangeStart', (event, routeTo) => {
                    if ((angular.isDefined(routeTo.$$route) && !routeTo.$$route.anonymous) && !userSession.isLoggedIn()) {
                        event.preventDefault();
                        $location.path('/login');
                    }
                });
            }
        ]);
}