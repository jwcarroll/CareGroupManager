module Controllers {
    export interface IMenuItem {
        name: string;
        route: string;
        iconClass?: string;
        actions?: IMenuItem[]
    }

    export class Navigation {
        public static $inject = ['$location', 'userSession', 'accountService'];

        public menu: IMenuItem[];

        constructor(
            private $location: ng.ILocationService,
            private userSession: Services.UserSession,
            private accountService: Services.AccountService) {
            this.init();
        }

        public isCurrentRoute(menuItem: IMenuItem) {
            return menuItem.route == this.$location.path();
        }

        public getActions() {
            var menuItem = _.find(this.menu, { route: this.$location.path() });

            return menuItem && menuItem.actions;
        }

        public logout() {
            this.accountService.logout()
                .success(() => {
                    this.$location.path('/login');
                });
        }

        private init() {
            this.menu = [
                {
                    name: 'Members',
                    route: '/member-list'
                },
                {
                    name: 'Care Groups',
                    route: '/care-groups'
                }
            ];
        }
    }

    angular.module('care-group')
        .controller('navigationCtrl', Navigation);
}