module Controllers {
    export class LoginCtrl {
        public static $inject = ['$location', 'accountService'];

        public username: string;
        public password: string;
        public isLoggingIn: boolean;

        constructor(
            private $location: ng.ILocationService,
            private accountService: Services.AccountService) {
        }

        public login() {
            this.isLoggingIn = true;

            this.accountService.login({
                username: this.username,
                password: this.password
            }).success(result => {
                this.$location.path('/');
            }).finally(() => {
                this.isLoggingIn = false;
            });
        }
    }

    angular.module('care-group')
        .controller('loginCtrl', LoginCtrl);
} 