module Services {
    export interface ISecurityToken {
        access_token: string;
        token_type: string;
        expires_in: number;
        userName: string;
        ".issued": Date;
        ".expires": Date;
    }

    export interface ILoginData {
        username: string;
        password: string;
    }

    export class AccountService {
        public static $inject = ['$rootScope', '$http'];

        public static LoginSuccessEvent = 'cgm:user-login-success';
        public static LoginFailedEvent = 'cgm:user-login-failed';
        public static LogoutSuccessEvent = 'cgm:user-logout-success';

        constructor(
            private $rootScope: ng.IRootScopeService,
            private $http: ng.IHttpService) {}

        public login(loginData: ILoginData) {
            var data = angular.extend(loginData, {
                grant_type: 'password'
            });

            return this.$http<ISecurityToken>({
                method: 'POST',
                url: '/Token',
                data: $.param(data),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
            }).success(token => {
                this.$rootScope.$broadcast(AccountService.LoginSuccessEvent, token);
            }).error(result => {
                this.$rootScope.$broadcast(AccountService.LoginFailedEvent, result);
            });
        }

        public logout() {
            return this.$http({
                    method: 'POST',
                    url: '/api/account/logout'
                })
                .success(result => {
                    this.$rootScope.$broadcast(AccountService.LogoutSuccessEvent);
                });
        }
    }

    angular.module('care-group')
        .service('accountService', AccountService);
}