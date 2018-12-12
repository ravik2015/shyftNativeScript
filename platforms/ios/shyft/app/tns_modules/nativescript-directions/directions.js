"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var directions_common_1 = require("./directions.common");
var utils = require("tns-core-modules/utils/utils");
var isAppAvailable = require("nativescript-appavailability").availableSync;
var Directions = (function (_super) {
    __extends(Directions, _super);
    function Directions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Directions.prototype.available = function () {
        return new Promise(function (resolve, reject) {
            resolve(true);
        });
    };
    Directions.prototype.navigate = function (options) {
        return new Promise(function (resolve, reject) {
            try {
                var fromToQs = Directions.getFromToQuerystring(options);
                if ((options.ios === undefined || options.ios.preferGoogleMaps !== false) && isAppAvailable("comgooglemaps://")) {
                    utils.openUrl("comgooglemaps://" + fromToQs);
                }
                else if (options.ios && options.ios.allowGoogleMapsWeb && options.to instanceof Array && options.to.length > 1) {
                    utils.openUrl("http://maps.google.com/maps" + fromToQs);
                }
                else {
                    utils.openUrl("http://maps.apple.com/maps" + fromToQs);
                }
                resolve();
            }
            catch (e) {
                reject(e);
            }
        });
    };
    return Directions;
}(directions_common_1.DirectionsCommon));
exports.Directions = Directions;
//# sourceMappingURL=directions.js.map