module Controllers {
    export class CreateCareGroupCtrl {

        public static $inject = ['$modalInstance'];

        public title = 'Create New Care Group';
        public dismissButtonText = 'Cancel';
        public closeButtonText = 'OK';
        
        public value:string;

        constructor(private $modalInstance: any) {
            
        }

        public dismiss() {
            return this.$modalInstance.dismiss();
        }

        public close() {
            return this.$modalInstance.close(this.value);
        }
    }
    
    angular.module('care-group')
        .controller('CreateCareGroupCtrl', CreateCareGroupCtrl);
} 