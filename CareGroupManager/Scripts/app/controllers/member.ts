module Controllers {
    export interface IMemberRouteParams {
        memberId:string;
    }

    export class MemberCtrl {
        public static $inject = ['$routeParams', '$location', '$modal', 'membersService', 'careGroupService'];

        private _originalMember: Services.IMember = <Services.IMember>{};
        private _member:Services.IMember = <Services.IMember>{};
        
        public careGroups: Services.ICareGroup[];
        public form:ng.IFormController;
        public modelState:any;

        constructor(
            private $routeParams: IMemberRouteParams,
            private $location: ng.ILocationService,
            private $modal: any,
            private membersService: Services.MembersService,
            private careGroupService: Services.CareGroupService
        ) {
            this.init();
        }

        public get member() {
            return this._member;
        }

        public set member(newMember: Services.IMember) {
            if (angular.isUndefined(newMember)) return;

            this._originalMember = angular.copy(newMember);
            this._member = newMember;
        }

        public save() {
            this.membersService.saveMember(this.member)
                .success(() => {
                this.$location.path('/member-list');
                })
            .error((error:any) => {
                this.modelState = error && error.modelState;
            });
        }

        public deleteMember() {
            var modalInstance = this.$modal.open({
                templateUrl: '/views/okCancelDialog',
                controller: 'DeleteMemberCtrl as modal',
                backdrop: true
            });

            modalInstance.result
                .then(() => this.membersService.deleteMember(this.member))
                .then(() => this.$location.path('/'));
        }

        public cancelChanges() {
            this._member = angular.copy(this._originalMember);

            this.form.$setPristine();
        }

        private init() {
            var memberId = this.$routeParams.memberId;

            if (angular.isUndefined(memberId)) return;

            this.careGroupService.getCareGroups()
                .success(result => {
                    this.careGroups = result.items;
                });

            this.membersService.getMember(memberId)
                .success(member => {
                this.member = member;
            });
        }
    }

    angular.module('care-group')
        .controller('memberCtrl', MemberCtrl);
}