module Services {
    export class UserSession {
        public static $inject = ['$rootScope','localStorageService'];

        private _token: ISecurityToken;
        private static sessionStoreKey = 'session-key';

        constructor(
            private $rootScope: ng.IRootScopeService,
            private localStorageService: any
        ) {
            this.init();
        }

        public get token() {
            return this._token && this._token.access_token;
        }

        public isLoggedIn() {
            return this._token;
        }

        public get userName() {
            return this._token && this._token.userName;
        }

        private init() {
            this._token = this.localStorageService.get(UserSession.sessionStoreKey);

            this.$rootScope.$on(AccountService.LoginSuccessEvent, this.handleLoginSuccess.bind(this));
            this.$rootScope.$on(AccountService.LoginFailedEvent, this.handleLoginError.bind(this));
            this.$rootScope.$on(AccountService.LogoutSuccessEvent, this.handleLogoutSuccess.bind(this));
        }

        private handleLoginSuccess(event:ng.IAngularEvent, token: ISecurityToken) {
            this._token = token;
            this.localStorageService.set(UserSession.sessionStoreKey, token);
        }

        private handleLoginError(event: ng.IAngularEvent, result: Object) {
            //throw new Error("Not implemented");
        }

        private handleLogoutSuccess(event: ng.IAngularEvent) {
            this._token = null;
            this.localStorageService.remove(UserSession.sessionStoreKey);
        }
    }

    angular.module('care-group')
        .service('userSession', UserSession);
}