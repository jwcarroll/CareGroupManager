module Controllers {
    export class DeleteMemberCtrl {

        public static $inject = ['$modalInstance'];

        public title = 'Delete Member?';
        public text = 'Are you sure you want to delete this member?';
        public dismissButtonText = 'Cancel';
        public closeButtonText = 'OK';
        
        constructor(private $modalInstance: any) {
            
        }

        public dismiss() {
            return this.$modalInstance.dismiss();
        }

        public close() {
            return this.$modalInstance.close();
        }
    }
    
    angular.module('care-group')
        .controller('DeleteMemberCtrl', DeleteMemberCtrl);
}