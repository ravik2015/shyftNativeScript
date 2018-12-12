"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("tns-core-modules/file-system");
var imgSrc = require("tns-core-modules/image-source");
var utils = require("tns-core-modules/utils/utils");
var http = require("tns-core-modules/http");
var mapbox_common_1 = require("./mapbox.common");
exports.MapStyle = mapbox_common_1.MapStyle;
var color_1 = require("tns-core-modules/color");
(function () {
    MGLOfflineStorage.sharedOfflineStorage();
})();
var _markers = [];
var _markerIconDownloadCache = [];
var _mapView;
var _mapbox = {};
var _delegate;
var _setMapboxMapOptions = function (mapView, settings) {
    mapView.logoView.hidden = settings.hideLogo;
    mapView.attributionButton.hidden = settings.hideAttribution;
    mapView.showsUserLocation = settings.showUserLocation;
    mapView.compassView.hidden = settings.hideCompass;
    mapView.rotateEnabled = !settings.disableRotation;
    mapView.scrollEnabled = !settings.disableScroll;
    mapView.zoomEnabled = !settings.disableZoom;
    mapView.allowsTilting = !settings.disableTilt;
    if (settings.center && settings.center.lat && settings.center.lng) {
        var centerCoordinate = CLLocationCoordinate2DMake(settings.center.lat, settings.center.lng);
        mapView.setCenterCoordinateZoomLevelAnimated(centerCoordinate, settings.zoomLevel, false);
    }
    else {
        mapView.setZoomLevelAnimated(settings.zoomLevel, false);
    }
    mapView.autoresizingMask = 2 | 16;
};
var _getMapStyle = function (input) {
    if (/^mapbox:\/\/styles/.test(input)) {
        return NSURL.URLWithString(input);
    }
    else if (input === mapbox_common_1.MapStyle.LIGHT || input === mapbox_common_1.MapStyle.LIGHT.toString()) {
        return MGLStyle.lightStyleURL();
    }
    else if (input === mapbox_common_1.MapStyle.DARK || input === mapbox_common_1.MapStyle.DARK.toString()) {
        return MGLStyle.darkStyleURL();
    }
    else if (input === mapbox_common_1.MapStyle.EMERALD || input === mapbox_common_1.MapStyle.EMERALD.toString()) {
        return MGLStyle.emeraldStyleURL();
    }
    else if (input === mapbox_common_1.MapStyle.OUTDOORS || input === mapbox_common_1.MapStyle.OUTDOORS.toString()) {
        return MGLStyle.outdoorsStyleURL();
    }
    else if (input === mapbox_common_1.MapStyle.SATELLITE || input === mapbox_common_1.MapStyle.SATELLITE.toString()) {
        return MGLStyle.satelliteStyleURL();
    }
    else if (input === mapbox_common_1.MapStyle.HYBRID || input === mapbox_common_1.MapStyle.SATELLITE_STREETS || input === mapbox_common_1.MapStyle.HYBRID.toString() || input === mapbox_common_1.MapStyle.SATELLITE_STREETS.toString()) {
        return MGLStyle.satelliteStreetsStyleURL();
    }
    else if (input === mapbox_common_1.MapStyle.TRAFFIC_DAY || input === mapbox_common_1.MapStyle.TRAFFIC_DAY.toString()) {
        return MGLStyle.trafficDayStyleURL();
    }
    else if (input === mapbox_common_1.MapStyle.TRAFFIC_NIGHT || input === mapbox_common_1.MapStyle.TRAFFIC_NIGHT.toString()) {
        return MGLStyle.trafficNightStyleURL();
    }
    else {
        return MGLStyle.streetsStyleURL();
    }
};
var MapboxView = (function (_super) {
    __extends(MapboxView, _super);
    function MapboxView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MapboxView.prototype.getNativeMapView = function () {
        return this.mapView;
    };
    MapboxView.prototype.createNativeView = function () {
        var _this = this;
        var v = _super.prototype.createNativeView.call(this);
        this.nativeView = UIView.new();
        setTimeout(function () {
            _this.initMap();
        }, 0);
        return v;
    };
    MapboxView.prototype.initMap = function () {
        var _this = this;
        if (!this.mapView && this.config.accessToken) {
            this.mapbox = new Mapbox();
            var settings_1 = Mapbox.merge(this.config, Mapbox.defaults);
            var drawMap = function () {
                MGLAccountManager.setAccessToken(settings_1.accessToken);
                _this.mapView = MGLMapView.alloc().initWithFrameStyleURL(CGRectMake(0, 0, _this.nativeView.frame.size.width, _this.nativeView.frame.size.height), _getMapStyle(settings_1.style));
                _this.mapView.delegate = _this.delegate = MGLMapViewDelegateImpl.new().initWithCallback(function () {
                    _this.notify({
                        eventName: mapbox_common_1.MapboxViewBase.mapReadyEvent,
                        object: _this,
                        map: _this,
                        ios: _this.mapView
                    });
                    _this.notify({
                        eventName: mapbox_common_1.MapboxViewBase.locationPermissionGrantedEvent,
                        object: _this,
                        map: _this,
                        ios: _this.mapView
                    });
                });
                _setMapboxMapOptions(_this.mapView, settings_1);
                _markers = [];
                _this.nativeView.addSubview(_this.mapView);
            };
            setTimeout(drawMap, settings_1.delay ? settings_1.delay : 0);
        }
    };
    MapboxView.prototype.onLayout = function (left, top, right, bottom) {
        if (this.ios.layer.bounds.size.width === 0 || this.ios.layer.bounds.size.height === 0) {
            if (this.ios.superview) {
                this.mapView.frame = CGRectMake(0, 0, this.ios.superview.layer.bounds.size.width, this.ios.superview.layer.bounds.size.height);
            }
        }
        _super.prototype.onLayout.call(this, left, top, right, bottom);
    };
    return MapboxView;
}(mapbox_common_1.MapboxViewBase));
exports.MapboxView = MapboxView;
var Mapbox = (function (_super) {
    __extends(Mapbox, _super);
    function Mapbox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Mapbox.prototype.show = function (options) {
        return new Promise(function (resolve, reject) {
            try {
                var settings = Mapbox.merge(options, Mapbox.defaults);
                if (settings.accessToken === undefined) {
                    reject("Please set the 'accessToken' parameter");
                    return;
                }
                if (_mapView) {
                    _mapView.removeFromSuperview();
                }
                var view_1 = utils.ios.getter(UIApplication, UIApplication.sharedApplication).keyWindow.rootViewController.view, frameRect = view_1.frame, mapFrame = CGRectMake(settings.margins.left, settings.margins.top, frameRect.size.width - settings.margins.left - settings.margins.right, frameRect.size.height - settings.margins.top - settings.margins.bottom), styleURL = _getMapStyle(settings.style);
                MGLAccountManager.setAccessToken(settings.accessToken);
                _mapbox.mapView = MGLMapView.alloc().initWithFrameStyleURL(mapFrame, styleURL);
                _setMapboxMapOptions(_mapbox.mapView, settings);
                _mapbox.mapView.delegate = _delegate = MGLMapViewDelegateImpl.new().initWithCallback(function (mapView) {
                    resolve({
                        ios: mapView
                    });
                });
                _markers = [];
                _addMarkers(settings.markers);
                setTimeout(function () {
                    view_1.addSubview(_mapbox.mapView);
                }, 500);
            }
            catch (ex) {
                console.log("Error in mapbox.show: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.hide = function () {
        return new Promise(function (resolve, reject) {
            try {
                if (_mapbox.mapView) {
                    _mapbox.mapView.removeFromSuperview();
                }
                resolve();
            }
            catch (ex) {
                console.log("Error in mapbox.hide: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.unhide = function () {
        return new Promise(function (resolve, reject) {
            try {
                if (_mapbox.mapView) {
                    var view = utils.ios.getter(UIApplication, UIApplication.sharedApplication).keyWindow.rootViewController.view;
                    view.addSubview(_mapbox.mapView);
                    resolve();
                }
                else {
                    reject("No map found");
                }
            }
            catch (ex) {
                console.log("Error in mapbox.unhide: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.destroy = function (nativeMap) {
        return new Promise(function (resolve, reject) {
            var theMap = nativeMap || _mapbox.mapView;
            if (theMap) {
                theMap.removeFromSuperview();
                theMap.delegate = null;
                _mapbox = {};
            }
            resolve();
        });
    };
    Mapbox.prototype.setMapStyle = function (style, nativeMap) {
        return new Promise(function (resolve, reject) {
            try {
                var theMap = nativeMap || _mapbox.mapView;
                theMap.styleURL = _getMapStyle(style);
                resolve();
            }
            catch (ex) {
                console.log("Error in mapbox.setMapStyle: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.addMarkers = function (markers, nativeMap) {
        return new Promise(function (resolve, reject) {
            try {
                var theMap = nativeMap || _mapbox.mapView;
                _addMarkers(markers, theMap);
                resolve();
            }
            catch (ex) {
                console.log("Error in mapbox.addMarkers: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.removeMarkers = function (ids, nativeMap) {
        return new Promise(function (resolve, reject) {
            try {
                var theMap = nativeMap || _mapbox.mapView;
                var markersToRemove = [];
                for (var m in _markers) {
                    var marker = _markers[m];
                    if (!ids || (marker.id && ids.indexOf(marker.id) > -1)) {
                        markersToRemove.push(marker.ios);
                    }
                }
                if (ids) {
                    _markers = _markers.filter(function (marker) {
                        return ids.indexOf(marker.id) < 0;
                    });
                }
                else {
                    _markers = [];
                }
                if (markersToRemove.length > 0) {
                    theMap.removeAnnotations(markersToRemove);
                }
                resolve();
            }
            catch (ex) {
                console.log("Error in mapbox.removeMarkers: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.setCenter = function (options, nativeMap) {
        return new Promise(function (resolve, reject) {
            try {
                var theMap = nativeMap || _mapbox.mapView;
                var animated = options.animated === undefined || options.animated;
                var coordinate = CLLocationCoordinate2DMake(options.lat, options.lng);
                theMap.setCenterCoordinateAnimated(coordinate, animated);
                resolve();
            }
            catch (ex) {
                console.log("Error in mapbox.setCenter: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.getCenter = function (nativeMap) {
        return new Promise(function (resolve, reject) {
            try {
                var theMap = nativeMap || _mapbox.mapView;
                var coordinate = theMap.centerCoordinate;
                resolve({
                    lat: coordinate.latitude,
                    lng: coordinate.longitude
                });
            }
            catch (ex) {
                console.log("Error in mapbox.getCenter: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.setZoomLevel = function (options, nativeMap) {
        return new Promise(function (resolve, reject) {
            try {
                var theMap = nativeMap || _mapbox.mapView;
                var animated = options.animated === undefined || options.animated;
                var level = options.level;
                if (level >= 0 && level <= 20) {
                    theMap.setZoomLevelAnimated(level, animated);
                    resolve();
                }
                else {
                    reject("invalid zoomlevel, use any double value from 0 to 20 (like 8.3)");
                }
            }
            catch (ex) {
                console.log("Error in mapbox.setZoomLevel: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.getZoomLevel = function (nativeMap) {
        return new Promise(function (resolve, reject) {
            try {
                var theMap = nativeMap || _mapbox.mapView;
                resolve(theMap.zoomLevel);
            }
            catch (ex) {
                console.log("Error in mapbox.getZoomLevel: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.setTilt = function (options, nativeMap) {
        return new Promise(function (resolve, reject) {
            try {
                var theMap = nativeMap || _mapbox.mapView;
                var cam = theMap.camera;
                cam.pitch = options.tilt;
                var durationMs = options.duration ? options.duration : 5000;
                theMap.setCameraWithDurationAnimationTimingFunction(cam, durationMs / 1000, CAMediaTimingFunction.functionWithName(kCAMediaTimingFunctionEaseInEaseOut));
                setTimeout(function () {
                    resolve();
                }, durationMs);
            }
            catch (ex) {
                console.log("Error in mapbox.setTilt: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.getTilt = function (nativeMap) {
        return new Promise(function (resolve, reject) {
            try {
                var theMap = nativeMap || _mapbox.mapView;
                resolve(theMap.camera.pitch);
            }
            catch (ex) {
                console.log("Error in mapbox.getTilt: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.getUserLocation = function (nativeMap) {
        return new Promise(function (resolve, reject) {
            try {
                var theMap = nativeMap || _mapbox.mapView;
                var loc = theMap.userLocation;
                if (loc === null) {
                    reject("Location not available");
                }
                else {
                    resolve({
                        location: {
                            lat: loc.coordinate.latitude,
                            lng: loc.coordinate.longitude
                        },
                        speed: loc.location.speed
                    });
                }
            }
            catch (ex) {
                console.log("Error in mapbox.getUserLocation: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.addPolygon = function (options, nativeMap) {
        return new Promise(function (resolve, reject) {
            reject("not implemented for iOS");
        });
    };
    Mapbox.prototype.addPolyline = function (options, nativeMap) {
        return new Promise(function (resolve, reject) {
            var theMap = nativeMap || _mapbox.mapView;
            var points = options.points;
            if (points === undefined) {
                reject("Please set the 'points' parameter");
                return;
            }
            var coordinateArray = [];
            for (var p in points) {
                var point = points[p];
                coordinateArray.push([point.lng, point.lat]);
            }
            var polylineID = "polyline_" + options.id;
            if (theMap.style.sourceWithIdentifier(polylineID)) {
                reject("Remove the polyline with this id first with 'removePolylines': " + polylineID);
                return;
            }
            var geoJSON = "{\"type\": \"FeatureCollection\", \"features\": [{\"type\": \"Feature\",\"properties\": {},\"geometry\": {\"type\": \"LineString\", \"coordinates\": " + JSON.stringify(coordinateArray) + "}}]}";
            var geoDataStr = NSString.stringWithString(geoJSON);
            var geoData = geoDataStr.dataUsingEncoding(NSUTF8StringEncoding);
            var geoDataBase64Enc = geoData.base64EncodedStringWithOptions(0);
            var geo = NSData.alloc().initWithBase64EncodedStringOptions(geoDataBase64Enc, null);
            var shape = MGLShape.shapeWithDataEncodingError(geo, NSUTF8StringEncoding);
            var source = MGLShapeSource.alloc().initWithIdentifierShapeOptions(polylineID, shape, null);
            theMap.style.addSource(source);
            var layer = MGLLineStyleLayer.alloc().initWithIdentifierSource(polylineID, source);
            layer.lineColor = MGLStyleValue.valueWithRawValue(!options.color ? UIColor.blackColor : (options.color instanceof color_1.Color ? options.color.ios : new color_1.Color(options.color).ios));
            layer.lineWidth = MGLStyleValue.valueWithRawValue(options.width || 5);
            layer.lineOpacity = MGLStyleValue.valueWithRawValue(options.opacity === undefined ? 1 : options.opacity);
            theMap.style.addLayer(layer);
            resolve();
        });
    };
    Mapbox.prototype.removePolylineById = function (theMap, id) {
        var polylineID = "polyline_" + id;
        var layer = theMap.style.layerWithIdentifier(polylineID);
        if (layer !== null) {
            theMap.style.removeLayer(layer);
        }
        var source = theMap.style.sourceWithIdentifier(polylineID);
        if (source !== null) {
            console.log(">>> removing source " + polylineID);
            theMap.style.removeSource(source);
        }
    };
    Mapbox.prototype.removePolylines = function (ids, nativeMap) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var theMap = nativeMap || _mapbox.mapView;
            ids.map(function (id) { return _this.removePolylineById(theMap, id); });
            resolve();
        });
    };
    Mapbox.prototype.animateCamera = function (options, nativeMap) {
        return new Promise(function (resolve, reject) {
            try {
                var theMap = nativeMap || _mapbox.mapView;
                var target = options.target;
                if (target === undefined) {
                    reject("Please set the 'target' parameter");
                    return;
                }
                var cam = MGLMapCamera.camera();
                cam.centerCoordinate = CLLocationCoordinate2DMake(target.lat, target.lng);
                if (options.altitude) {
                    cam.altitude = options.altitude;
                }
                if (options.bearing) {
                    cam.heading = options.bearing;
                }
                if (options.tilt) {
                    cam.pitch = options.tilt;
                }
                var durationMs = options.duration ? options.duration : 10000;
                theMap.setCameraWithDurationAnimationTimingFunction(cam, durationMs / 1000, CAMediaTimingFunction.functionWithName(kCAMediaTimingFunctionEaseInEaseOut));
                setTimeout(function () {
                    resolve();
                }, durationMs);
            }
            catch (ex) {
                console.log("Error in mapbox.animateCamera: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.setOnMapClickListener = function (listener, nativeMap) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                var theMap = nativeMap || _mapbox.mapView;
                if (!theMap) {
                    reject("No map has been loaded");
                    return;
                }
                theMap['mapTapHandler'] = MapTapHandlerImpl.initWithOwnerAndListenerForMap(new WeakRef(_this), listener, theMap);
                var tapGestureRecognizer = UITapGestureRecognizer.alloc().initWithTargetAction(theMap['mapTapHandler'], "tap");
                for (var i = 0; i < theMap.gestureRecognizers.count; i++) {
                    var recognizer = theMap.gestureRecognizers.objectAtIndex(i);
                    if (recognizer instanceof UITapGestureRecognizer) {
                        tapGestureRecognizer.requireGestureRecognizerToFail(recognizer);
                    }
                }
                theMap.addGestureRecognizer(tapGestureRecognizer);
                resolve();
            }
            catch (ex) {
                console.log("Error in mapbox.setOnMapClickListener: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.setOnScrollListener = function (listener, nativeMap) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                var theMap = nativeMap || _mapbox.mapView;
                if (!theMap) {
                    reject("No map has been loaded");
                    return;
                }
                theMap['mapPanHandler'] = MapPanHandlerImpl.initWithOwnerAndListenerForMap(new WeakRef(_this), listener, theMap);
                for (var i = 0; i < theMap.gestureRecognizers.count; i++) {
                    var recognizer = theMap.gestureRecognizers.objectAtIndex(i);
                    if (recognizer instanceof UIPanGestureRecognizer) {
                        recognizer.addTargetAction(theMap['mapPanHandler'], "pan");
                        break;
                    }
                }
                resolve();
            }
            catch (ex) {
                console.log("Error in mapbox.setOnScrollListener: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.setOnFlingListener = function (listener, nativeMap) {
        return Promise.reject("Not supported on iOS");
    };
    Mapbox.prototype.setOnCameraMoveListener = function (listener, nativeMap) {
        return Promise.reject("Not currently supported on iOS");
    };
    Mapbox.prototype.setOnCameraMoveCancelListener = function (listener, nativeMap) {
        return Promise.reject("Not currently supported on iOS");
    };
    Mapbox.prototype.setOnCameraIdleListener = function (listener, nativeMap) {
        return Promise.reject("Not currently supported on iOS");
    };
    Mapbox.prototype.getViewport = function (nativeMap) {
        return new Promise(function (resolve, reject) {
            try {
                var theMap = nativeMap || _mapbox.mapView;
                if (!theMap) {
                    reject("No map has been loaded");
                    return;
                }
                var visibleBounds = theMap.visibleCoordinateBounds;
                var bounds = {
                    north: visibleBounds.ne.latitude,
                    east: visibleBounds.ne.longitude,
                    south: visibleBounds.sw.latitude,
                    west: visibleBounds.sw.longitude
                };
                resolve({
                    bounds: bounds,
                    zoomLevel: theMap.zoomLevel
                });
            }
            catch (ex) {
                console.log("Error in mapbox.getViewport: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.setViewport = function (options, nativeMap) {
        return new Promise(function (resolve, reject) {
            try {
                var theMap = nativeMap || _mapbox.mapView;
                if (!theMap) {
                    reject("No map has been loaded");
                    return;
                }
                var bounds = {
                    sw: CLLocationCoordinate2DMake(options.bounds.south, options.bounds.west),
                    ne: CLLocationCoordinate2DMake(options.bounds.north, options.bounds.east)
                };
                var animated = options.animated === undefined || options.animated;
                var padding = {
                    top: 25,
                    left: 25,
                    bottom: 25,
                    right: 25
                };
                theMap.setVisibleCoordinateBoundsEdgePaddingAnimated(bounds, padding, animated);
                resolve();
            }
            catch (ex) {
                console.log("Error in mapbox.setViewport: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.downloadOfflineRegion = function (options) {
        return new Promise(function (resolve, reject) {
            try {
                var styleURL = _getMapStyle(options.style);
                var swCoordinate = CLLocationCoordinate2DMake(options.bounds.south, options.bounds.west);
                var neCoordinate = CLLocationCoordinate2DMake(options.bounds.north, options.bounds.east);
                var bounds = {
                    sw: swCoordinate,
                    ne: neCoordinate
                };
                var region = MGLTilePyramidOfflineRegion.alloc().initWithStyleURLBoundsFromZoomLevelToZoomLevel(styleURL, bounds, options.minZoom, options.maxZoom);
                if (options.accessToken) {
                    MGLAccountManager.setAccessToken(options.accessToken);
                }
                if (options.onProgress) {
                    _addObserver(MGLOfflinePackProgressChangedNotification, function (notification) {
                        var offlinePack = notification.object;
                        var offlinePackProgress = offlinePack.progress;
                        var userInfo = NSKeyedUnarchiver.unarchiveObjectWithData(offlinePack.context);
                        var complete = offlinePackProgress.countOfResourcesCompleted === offlinePackProgress.countOfResourcesExpected;
                        options.onProgress({
                            name: userInfo.objectForKey("name"),
                            completed: offlinePackProgress.countOfResourcesCompleted,
                            expected: offlinePackProgress.countOfResourcesExpected,
                            percentage: Math.round((offlinePackProgress.countOfResourcesCompleted / offlinePackProgress.countOfResourcesExpected) * 10000) / 100,
                            complete: complete
                        });
                        if (complete) {
                            resolve();
                        }
                    });
                }
                _addObserver(MGLOfflinePackErrorNotification, function (notification) {
                    var offlinePack = notification.object;
                    var userInfo = NSKeyedUnarchiver.unarchiveObjectWithData(offlinePack.context);
                    var error = notification.userInfo[MGLOfflinePackErrorUserInfoKey];
                    reject({
                        name: userInfo.objectForKey("name"),
                        error: "Download error. " + error
                    });
                });
                _addObserver(MGLOfflinePackMaximumMapboxTilesReachedNotification, function (notification) {
                    var offlinePack = notification.object;
                    var userInfo = NSKeyedUnarchiver.unarchiveObjectWithData(offlinePack.context);
                    var maximumCount = notification.userInfo[MGLOfflinePackMaximumCountUserInfoKey];
                    console.log("Offline region '" + userInfo.objectForKey("name") + "' reached the tile limit of " + maximumCount);
                });
                var userInfo = { "name": options.name };
                var context = NSKeyedArchiver.archivedDataWithRootObject(userInfo);
                MGLOfflineStorage.sharedOfflineStorage().addPackForRegionWithContextCompletionHandler(region, context, function (pack, error) {
                    if (error) {
                        reject(error.localizedFailureReason);
                    }
                    else {
                        pack.resume();
                    }
                });
            }
            catch (ex) {
                console.log("Error in mapbox.downloadOfflineRegion: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.listOfflineRegions = function (options) {
        return new Promise(function (resolve, reject) {
            try {
                var packs = MGLOfflineStorage.sharedOfflineStorage().packs;
                if (!packs) {
                    reject("No packs found or Mapbox not ready yet");
                    return;
                }
                var regions = [];
                for (var i = 0; i < packs.count; i++) {
                    var pack = packs.objectAtIndex(i);
                    var region = pack.region;
                    var userInfo = NSKeyedUnarchiver.unarchiveObjectWithData(pack.context);
                    regions.push({
                        name: userInfo.objectForKey("name"),
                        style: "" + region.styleURL,
                        minZoom: region.minimumZoomLevel,
                        maxZoom: region.maximumZoomLevel,
                        bounds: {
                            north: region.bounds.ne.latitude,
                            east: region.bounds.ne.longitude,
                            south: region.bounds.sw.latitude,
                            west: region.bounds.sw.longitude
                        }
                    });
                }
                resolve(regions);
            }
            catch (ex) {
                console.log("Error in mapbox.listOfflineRegions: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.deleteOfflineRegion = function (options) {
        return new Promise(function (resolve, reject) {
            try {
                if (!options || !options.name) {
                    reject("Pass in the 'name' param");
                    return;
                }
                var packs = MGLOfflineStorage.sharedOfflineStorage().packs;
                var regions = [];
                var found = false;
                for (var i = 0; i < packs.count; i++) {
                    var pack = packs.objectAtIndex(i);
                    var userInfo = NSKeyedUnarchiver.unarchiveObjectWithData(pack.context);
                    var name_1 = userInfo.objectForKey("name");
                    if (name_1 === options.name) {
                        found = true;
                        MGLOfflineStorage.sharedOfflineStorage().removePackWithCompletionHandler(pack, function (error) {
                            if (error) {
                                reject(error.localizedFailureReason);
                            }
                            else {
                                resolve();
                            }
                        });
                    }
                }
                if (!found) {
                    reject("Region not found");
                }
            }
            catch (ex) {
                console.log("Error in mapbox.deleteOfflineRegion: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.addExtrusion = function (options, nativeMap) {
        return new Promise(function (resolve, reject) {
            try {
                var theMap = nativeMap || _mapbox.mapView;
                if (!theMap) {
                    reject("No map has been loaded");
                    return;
                }
                resolve();
            }
            catch (ex) {
                console.log("Error in mapbox.deleteOfflineRegion: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.addGeoJsonClustered = function (options, nativeMap) {
        throw new Error('Method not implemented.');
    };
    return Mapbox;
}(mapbox_common_1.MapboxCommon));
exports.Mapbox = Mapbox;
var _addObserver = function (eventName, callback) {
    return utils.ios.getter(NSNotificationCenter, NSNotificationCenter.defaultCenter).addObserverForNameObjectQueueUsingBlock(eventName, null, utils.ios.getter(NSOperationQueue, NSOperationQueue.mainQueue), callback);
};
var _downloadImage = function (marker) {
    return new Promise(function (resolve, reject) {
        if (_markerIconDownloadCache[marker.icon]) {
            marker.iconDownloaded = _markerIconDownloadCache[marker.icon];
            resolve(marker);
            return;
        }
        http.getImage(marker.icon).then(function (output) {
            marker.iconDownloaded = output.ios;
            _markerIconDownloadCache[marker.icon] = marker.iconDownloaded;
            resolve(marker);
        }, function (ignoredError) {
            console.log("Download failed for " + marker.icon + " with error: " + ignoredError);
            resolve(marker);
        });
    });
};
var _downloadMarkerImages = function (markers) {
    var iterations = [];
    var result = [];
    for (var i = 0; i < markers.length; i++) {
        var marker = markers[i];
        if (marker.icon && marker.icon.startsWith("http")) {
            var p = _downloadImage(marker).then(function (mark) {
                result.push(mark);
            });
            iterations.push(p);
        }
        else {
            result.push(marker);
        }
    }
    return Promise.all(iterations).then(function (output) {
        return result;
    });
};
var _addMarkers = function (markers, nativeMap) {
    if (!markers) {
        console.log("No markers passed");
        return;
    }
    if (!Array.isArray(markers)) {
        console.log("markers must be passed as an Array: [{title: 'foo'}]");
        return;
    }
    var theMap = nativeMap || _mapbox.mapView;
    _downloadMarkerImages(markers).then(function (updatedMarkers) {
        for (var m in updatedMarkers) {
            var marker = updatedMarkers[m];
            var lat = marker.lat;
            var lng = marker.lng;
            var point = MGLPointAnnotation.new();
            point.coordinate = CLLocationCoordinate2DMake(lat, lng);
            point.title = marker.title;
            point.subtitle = marker.subtitle;
            _markers.push(marker);
            theMap.addAnnotation(point);
            if (marker.selected) {
                theMap.selectAnnotationAnimated(point, false);
            }
            marker.ios = point;
        }
    });
};
var MGLMapViewDelegateImpl = (function (_super) {
    __extends(MGLMapViewDelegateImpl, _super);
    function MGLMapViewDelegateImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MGLMapViewDelegateImpl.new = function () {
        return _super.new.call(this);
    };
    MGLMapViewDelegateImpl.prototype.initWithCallback = function (mapLoadedCallback) {
        this.mapLoadedCallback = mapLoadedCallback;
        return this;
    };
    MGLMapViewDelegateImpl.prototype.mapViewDidFinishLoadingMap = function (mapView) {
        if (this.mapLoadedCallback !== undefined) {
            this.mapLoadedCallback(mapView);
            this.mapLoadedCallback = undefined;
        }
    };
    MGLMapViewDelegateImpl.prototype.mapViewAnnotationCanShowCallout = function (mapView, annotation) {
        return true;
    };
    MGLMapViewDelegateImpl.prototype.mapViewDidFailLoadingMapWithError = function (mapView, error) {
        console.log("mapViewDidFailLoadingMapWithError: " + error);
    };
    MGLMapViewDelegateImpl.prototype.mapViewImageForAnnotation = function (mapView, annotation) {
        var cachedMarker = this.getTappedMarkerDetails(annotation);
        if (cachedMarker) {
            if (cachedMarker.reuseIdentifier) {
                var reusedImage = mapView.dequeueReusableAnnotationImageWithIdentifier(cachedMarker.reuseIdentifier);
                if (reusedImage) {
                    return reusedImage;
                }
            }
            if (cachedMarker.icon) {
                if (cachedMarker.icon.startsWith("res://")) {
                    var resourcename = cachedMarker.icon.substring("res://".length);
                    var imageSource = imgSrc.fromResource(resourcename);
                    if (imageSource === null) {
                        console.log("Unable to locate " + resourcename);
                    }
                    else {
                        cachedMarker.reuseIdentifier = cachedMarker.icon;
                        return MGLAnnotationImage.annotationImageWithImageReuseIdentifier(imageSource.ios, cachedMarker.reuseIdentifier);
                    }
                }
                else if (cachedMarker.icon.startsWith("http")) {
                    if (cachedMarker.iconDownloaded !== null) {
                        cachedMarker.reuseIdentifier = cachedMarker.icon;
                        return MGLAnnotationImage.annotationImageWithImageReuseIdentifier(cachedMarker.iconDownloaded, cachedMarker.reuseIdentifier);
                    }
                }
                else {
                    console.log("Please use res://resourcename, http(s)://imageurl or iconPath to use a local path");
                }
            }
            else if (cachedMarker.iconPath) {
                var appPath = fs.knownFolders.currentApp().path;
                var iconFullPath = appPath + "/" + cachedMarker.iconPath;
                if (fs.File.exists(iconFullPath)) {
                    var image = imgSrc.fromFile(iconFullPath).ios;
                    cachedMarker.reuseIdentifier = cachedMarker.iconPath;
                    return MGLAnnotationImage.annotationImageWithImageReuseIdentifier(image, cachedMarker.reuseIdentifier);
                }
            }
        }
        return null;
    };
    MGLMapViewDelegateImpl.prototype.mapViewAnnotationCalloutAccessoryControlTapped = function (mapView, annotation, control) {
    };
    MGLMapViewDelegateImpl.prototype.mapViewDidSelectAnnotation = function (mapView, annotation) {
        var cachedMarker = this.getTappedMarkerDetails(annotation);
        if (cachedMarker && cachedMarker.onTap) {
            cachedMarker.onTap(cachedMarker);
        }
    };
    MGLMapViewDelegateImpl.prototype.mapViewTapOnCalloutForAnnotation = function (mapView, annotation) {
        var cachedMarker = this.getTappedMarkerDetails(annotation);
        if (cachedMarker && cachedMarker.onCalloutTap) {
            cachedMarker.onCalloutTap(cachedMarker);
        }
    };
    MGLMapViewDelegateImpl.prototype.getTappedMarkerDetails = function (tapped) {
        for (var m in _markers) {
            var cached = _markers[m];
            if (cached.lat == tapped.coordinate.latitude &&
                cached.lng == tapped.coordinate.longitude &&
                cached.title == tapped.title &&
                cached.subtitle == tapped.subtitle) {
                return cached;
            }
        }
    };
    return MGLMapViewDelegateImpl;
}(NSObject));
MGLMapViewDelegateImpl.ObjCProtocols = [MGLMapViewDelegate];
var MapTapHandlerImpl = (function (_super) {
    __extends(MapTapHandlerImpl, _super);
    function MapTapHandlerImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MapTapHandlerImpl.initWithOwnerAndListenerForMap = function (owner, listener, mapView) {
        var handler = MapTapHandlerImpl.new();
        handler._owner = owner;
        handler._listener = listener;
        handler._mapView = mapView;
        return handler;
    };
    MapTapHandlerImpl.prototype.tap = function (recognizer) {
        var tapPoint = recognizer.locationInView(this._mapView);
        var tapCoordinate = this._mapView.convertPointToCoordinateFromView(tapPoint, this._mapView);
        this._listener({
            lat: tapCoordinate.latitude,
            lng: tapCoordinate.longitude
        });
    };
    return MapTapHandlerImpl;
}(NSObject));
MapTapHandlerImpl.ObjCExposedMethods = {
    "tap": { returns: interop.types.void, params: [interop.types.id] }
};
var MapPanHandlerImpl = (function (_super) {
    __extends(MapPanHandlerImpl, _super);
    function MapPanHandlerImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MapPanHandlerImpl.initWithOwnerAndListenerForMap = function (owner, listener, mapView) {
        var handler = MapPanHandlerImpl.new();
        handler._owner = owner;
        handler._listener = listener;
        handler._mapView = mapView;
        return handler;
    };
    MapPanHandlerImpl.prototype.pan = function (recognizer) {
        var panPoint = recognizer.locationInView(this._mapView);
        var panCoordinate = this._mapView.convertPointToCoordinateFromView(panPoint, this._mapView);
        this._listener({
            lat: panCoordinate.latitude,
            lng: panCoordinate.longitude
        });
    };
    return MapPanHandlerImpl;
}(NSObject));
MapPanHandlerImpl.ObjCExposedMethods = {
    "pan": { returns: interop.types.void, params: [interop.types.id] }
};
var MapSwipeHandlerImpl = (function (_super) {
    __extends(MapSwipeHandlerImpl, _super);
    function MapSwipeHandlerImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MapSwipeHandlerImpl.initWithOwnerAndListenerForMap = function (owner, listener, mapView) {
        var handler = MapSwipeHandlerImpl.new();
        handler._owner = owner;
        handler._listener = listener;
        handler._mapView = mapView;
        return handler;
    };
    MapSwipeHandlerImpl.prototype.swipe = function (recognizer) {
        var swipePoint = recognizer.locationInView(this._mapView);
        var swipeCoordinate = this._mapView.convertPointToCoordinateFromView(swipePoint, this._mapView);
        this._listener({
            lat: swipeCoordinate.latitude,
            lng: swipeCoordinate.longitude
        });
    };
    return MapSwipeHandlerImpl;
}(NSObject));
MapSwipeHandlerImpl.ObjCExposedMethods = {
    "swipe": { returns: interop.types.void, params: [interop.types.id] }
};
//# sourceMappingURL=mapbox.js.map