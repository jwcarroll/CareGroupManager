module Directives {

    interface IModelStateAttrs extends ng.IAttributes {
        modelState: string;
        modelStatePrefix: string;
    }

    interface IModelStateScope extends ng.IScope {
        modelStateErrors:any;
    }

    class ModelStateController {
        public frmCtrl:ng.IFormController = <ng.IFormController>{};

        constructor(
            private $scope: IModelStateScope,
            private $attrs: IModelStateAttrs) {
            this.init();
        }

        init() {
            this.$scope.$watch(
                this.$attrs.modelState,
                this.onModelStateChange.bind(this)
            );
        }
        
        onModelStateErrorChanged(name: string, listener: (newVal: any, oldVal: any) => void) {
            this.$scope.$watch('modelStateErrors.' + name, listener);
        }

        onModelStateChange(newVal, oldVal) {
            if (newVal === oldVal) return;

            var oldErrors = angular.copy(this.$scope.modelStateErrors);

            this.$scope.modelStateErrors = this.getModelStateErrors(newVal);

            angular.forEach(this.$scope.modelStateErrors, (msg, fieldName) => {
                if (!this.frmCtrl[fieldName]) return;

                this.frmCtrl[fieldName].$setValidity('modelState', false);

                if (oldErrors && oldErrors[fieldName]) {
                    delete oldErrors[fieldName];
                }
            });

            angular.forEach(oldErrors, (msg, fieldName) => {
                if (!this.frmCtrl[fieldName]) return;

                this.frmCtrl[fieldName].$setValidity('modelState', true);
            });
        }

        getModelStateErrors(modelState) {
            var errors = {};

            angular.forEach(modelState, (msgs, propName) => {
                var normalizedPropertyName = this.normalizePropertyName(propName);

                errors[normalizedPropertyName] = msgs[0];
            });

            return errors;
        }

        private normalizePropertyName(propName: string) {
            return propName.replace(this.$attrs.modelStatePrefix + '.', '')
                .replace(/^[a-zA-Z]{1}/, firstChar => {
                    return firstChar.toLowerCase();
                });
        }
    }

    ModelStateController.$inject = ['$scope', '$attrs'];

    function modelState() {
        return {
            restrict: 'A',
            require: ['modelState','form'],
            controller: ModelStateController,
            link: (scope: ng.IScope, elem: ng.IAugmentedJQuery, attrs: IModelStateAttrs, ctrls:any[]) => {
                var modelStateCtrl = ctrls[0],
                    frmCtrl = ctrls[1];

                modelStateCtrl.frmCtrl = frmCtrl;
            }
        };
    }

    interface IModelStateErrorAttrs extends ng.IAttributes {
        name:string;
    }

    function modelStateErrorMessage() {
        return {
            restrict: 'E',
            require: '^modelState',
            template: '<span></span>',
            link: (scope: ng.IScope, elem: ng.IAugmentedJQuery, attrs: IModelStateErrorAttrs, ctrl: ModelStateController) => {
                ctrl.onModelStateErrorChanged(attrs.name, (newVal, oldVal) => {
                    elem.text(newVal);
                });
            }
        };
    }

    angular.module('care-group')
        .directive('modelState', modelState)
        .directive('modelStateErrorMessage', modelStateErrorMessage);
}