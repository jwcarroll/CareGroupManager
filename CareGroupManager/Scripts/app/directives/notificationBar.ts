module CareGroup {

    export enum AlertType {
        success,
        info,
        warning,
        danger
    };

    export interface INotification {
        type: AlertType;
        message: string;
    }

    function notificationBar() {
        return {
            restrict: 'E',
            template: 
                '<div class="alert notification-bar" ng-class="nb.alertClass" ng-if="nb.show">' +
                    '<button type="button" class="close" ng-click="nb.dismiss()"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
                    '<p class="text-center">{{nb.message}}</p>' +
                '</div>',
            scope: {},
            link: (scope: ng.IScope, elem: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
                var nb = {
                    alertClass: 'alert-info',
                    show: false,
                    dismiss: dismiss,
                    message: 'Here is some information'
                };
                
                scope['nb'] = nb;

                scope.$on('cgm:notification', onNotification);

                scope.$on('$routeChangeSuccess', () => {
                    dismiss();
                });

                function onNotification(event: ng.IAngularEvent, notification: INotification) {
                    nb.alertClass = 'alert-' + AlertType[notification.type || AlertType.info];
                    nb.message = notification.message;
                    nb.show = true;
                }

                function dismiss() {
                    nb.show = false;
                }
            }
        };
    }

    angular.module('care-group')
        .directive('notificationBar', notificationBar);

} 