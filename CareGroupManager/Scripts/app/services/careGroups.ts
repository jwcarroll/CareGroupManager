 module Services {

    export interface ICareGroup {
        careGroupId?: number;
        name:string;
    }

    export class CareGroupService {
        public static $inject = ['$http'];

        constructor(private $http: ng.IHttpService) {}

        public getCareGroups() {
            return this.$http<IPagedResultSet<ICareGroup>>({
                method: 'GET',
                url: '/api/CareGroups'
            });
        }

        public getCareGroup(careGroupId: number): ng.IHttpPromise<ICareGroup>;
        public getCareGroup(careGroupId: string): ng.IHttpPromise<ICareGroup>;
        public getCareGroup(careGroupId: any): ng.IHttpPromise<ICareGroup> {
            return this.$http<ICareGroup>({
                method: 'GET',
                url: '/api/CareGroups/' + careGroupId
            });
        }

        public saveCareGroup(careGroup: ICareGroup) {
            var id = (careGroup && careGroup.careGroupId);

            return this.$http<ICareGroup>({
                url: '/api/CareGroups/' + (id || ''),
                method: id ? 'PUT' : 'POST',
                data: careGroup
            });
        }

        public deleteCareGroup(careGroup: ICareGroup) {
            var id = (careGroup && careGroup.careGroupId);

            return this.$http<IMember>({
                url: '/api/CareGroups/' + (id || ''),
                method: 'DELETE'
            });
        }

        public getCareGroupMembers(careGroupId: number, searchParams?: ISearchParams) {
            var search = _.defaults({}, searchParams, <ISearchParams>{
                $skip: 0,
                $top: 10,
                $count: true
            });

            this.convertFilterParams(search);

            return this.$http<IPagedResultSet<IMember>>({
                method: 'GET',
                url: '/api/CareGroups/' + careGroupId + '/members',
                params: search
            });
        }
        
        private convertFilterParams(search: ISearchParams) {
            if (!search.$filter) {
                delete search.$filter;
                return;
            }

            var searchProperties = ['FirstName', 'LastName', 'Email'];

            search.$filter = _.map(searchProperties, col => {
                return "contains(" + col + ",'" + search.$filter + "')";
            }).join(' or ');
        }
    }

    angular.module('care-group')
        .service('careGroupService', CareGroupService);
}