"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var braintree_common_1 = require("./braintree.common");
var utils = require("tns-core-modules/utils/utils");
var Braintree = (function (_super) {
    __extends(Braintree, _super);
    function Braintree() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.output = {
            'status': 'fail',
            'msg': 'unknown',
            'nonce': '',
            'paymentMethodType': '',
            'deviceInfo': ''
        };
        return _this;
    }
    Braintree.prototype.startPayment = function (token, options) {
        var t = this;
        return new Promise(function (resolve, reject) {
            var request = BTDropInRequest.alloc().init();
            if (options.amount) {
                request.amount = options.amount;
            }
            if (options.collectDeviceData) {
                request.collectDeviceData = true;
            }
            if (options.requestThreeDSecureVerification) {
                request.threeDSecureVerification = true;
            }
            var dropIn = BTDropInController.alloc().initWithAuthorizationRequestHandler(token, request, function (controller, result, error) {
                if (error !== null) {
                    setTimeout(function () {
                        reject(t.output);
                    }, 500);
                }
                else if (result.cancelled) {
                    t.output.status = 'cancelled';
                    t.output.msg = 'User has cancelled payment';
                    setTimeout(function () {
                        reject(t.output);
                    }, 500);
                }
                else {
                    t.output.status = 'success';
                    t.output.msg = 'Got Payment Nonce Value';
                    t.output.nonce = result.paymentMethod.nonce;
                    t.output.paymentMethodType = result.paymentMethod.type;
                    t.output.deviceInfo = PPDataCollector.collectPayPalDeviceData();
                    setTimeout(function () {
                        resolve(t.output);
                    }, 500);
                }
                controller.dismissViewControllerAnimatedCompletion(true, null);
            });
            var app = utils.ios.getter(UIApplication, UIApplication.sharedApplication);
            app.keyWindow.rootViewController.presentViewControllerAnimatedCompletion(dropIn, true, null);
        });
    };
    return Braintree;
}(braintree_common_1.Common));
exports.Braintree = Braintree;
//# sourceMappingURL=braintree.js.map