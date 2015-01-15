module Controllers {
    export class MembersCtrl {
        public static $inject = ['$location', 'membersService'];

        public members: Services.IMember[];
        public totalMembers: number;
        public currentPage: number = 1;
        public pageSize: number = 10;
        public searchText: string;

        constructor(
            private $location: ng.ILocationService,
            private membersService: Services.MembersService
        ) {
            this.init();
        }

        public navigateToMemberDetail(member: Services.IMember) {
            if (!member) return;

            this.$location.path('/member/' + member.memberId);
        }

        private init() {
            this.membersService.getMembers()
                .success(result => {
                    this.members = result.items;
                    this.totalMembers = result.count;
                });
        }

        private searchMembers() {
            this.membersService.getMembers({
                $skip: (this.currentPage - 1) * this.pageSize,
                $top: this.pageSize,
                $filter: this.searchText
            }).success(result => {
                this.members = result.items;
                this.totalMembers = result.count;
            });
        }
    }

    angular.module('care-group')
        .controller('membersCtrl', MembersCtrl);
} 