module Services {

    export interface IMember {
        memberId?: number;
        firstName: string;
        lastName: string;
        email: string;
        homePhone?: string;
        workPhone?: string;
        cellPhone?: string;
        address?: string;
        city?: string;
        state?: string;
        zip?: string;
        careGroupId?: number;
    }

    export interface ISearchParams {
        $skip?: number;
        $top?: number;
        $filter?: string;
        $count?: boolean;
    }

    export interface IPagedResultSet<T> {
        count: number;
        items: T[];
    }

    export class MembersService {
        public static $inject = ['$http'];

        private optionalProperties = [
            'homePhone',
            'workPhone',
            'cellPhone',
            'address',
            'city',
            'state',
            'zip'
        ];

        constructor(private $http: ng.IHttpService) {}

        public getMembers(searchParams?: ISearchParams) {
            var search = _.defaults({}, searchParams, <ISearchParams>{
                $skip: 0,
                $top: 10,
                $count: true
            });

            this.convertFilterParams(search);

            return this.$http<IPagedResultSet<IMember>>({
                method: 'GET',
                url: '/api/Members',
                params: search
            });
        }

        public getMember(memberId: string) {
            return this.$http<IMember>({
                method: 'GET',
                url: '/api/Members/' + memberId
            });
        }

        public saveMember(member: IMember) {
            var id = (member && member.memberId);

            this.convertEmptyStringsToNull(member, this.optionalProperties);

            return this.$http<IMember>({
                url: '/api/members/' + (id || ''),
                method: id ? 'PUT' : 'POST',
                data: member
            });
        }

        public deleteMember(member: IMember) {
            var id = (member && member.memberId);

            return this.$http<IMember>({
                url: '/api/members/' + (id || ''),
                method: 'DELETE'
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

        private convertEmptyStringsToNull(input: any, props: string[]) {
            if (!input) return;

            _.forEach(props, prop => {
                if (input.hasOwnProperty(prop) && input[prop] === '') {
                    input[prop] = null;
                }
            });
        }
    }

    angular.module('care-group')
        .service('membersService', MembersService);
}