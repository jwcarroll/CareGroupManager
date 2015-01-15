module Controllers {
    export class CareGroupsCtrl {
        public static $inject = ['careGroupService', '$modal'];

        public careGroups: Services.ICareGroup[];
        public currentCareGroup: Services.ICareGroup;
        public careGroupMembers: Services.IMember[];
        public newGroupName: string;

        constructor(
            private careGroupService: Services.CareGroupService,
            private $modal: any) {
            this.init();
        }

        public init() {
            this.careGroupService.getCareGroups()
                .success(results => {
                    this.careGroups = results.items;
                });
        }

        public loadCareGroupMembers() {
            if (angular.isUndefined(this.currentCareGroup)) return;

            this.careGroupService.getCareGroupMembers(this.currentCareGroup.careGroupId)
                .success(result => {
                this.careGroupMembers = result.items;
            });
        }

        public createNewGroup() {
            var modalInstance = this.$modal.open({
                templateUrl: '/views/promptDialog',
                controller: 'CreateCareGroupCtrl as modal',
                backdrop: true
            });

            modalInstance.result
                .then((newGroupName) => this.careGroupService.saveCareGroup({
                    name: newGroupName
                }))
                .then(result => {
                    this.careGroups.push(result.data);
                    this.currentCareGroup = result.data;
                    this.loadCareGroupMembers();
                });
        }
    }

    angular.module('care-group')
        .controller('careGroupCtrl', CareGroupsCtrl);
}