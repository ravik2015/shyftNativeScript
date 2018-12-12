"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("./common");
var MQTT = require('./mqttws31');
var MQTTClient = (function () {
    function MQTTClient(options) {
        this.connectionSuccess = new common_1.EventHandler();
        this.connectionFailure = new common_1.EventHandler();
        this.connectionLost = new common_1.EventHandler();
        this.messageArrived = new common_1.EventHandler();
        /* options
          host: string
          port: int - default 80 | useSSL 443
          path: string - default empty
          useSSL: bool - default false
          clientId: string - default UUID
          retryOnDisconnect: bool - default false
        */
        this.connected = false;
        this.host = options.host || 'localhost';
        this.useSSL = options.useSSL || false;
        if (options.port)
            this.port = options.port;
        else
            this.port = this.useSSL ? 443 : 80;
        this.path = options.path || '';
        this.clientId = options.clientId || common_1.guid();
        this.retryOnDisconnect = options.retryOnDisconnect || false;
        this.mqttClient = new MQTT.Client(this.host, this.port, this.path, this.clientId);
        this.mqttClient.useSSL = this.useSSL;
    }
    ;
    Object.defineProperty(MQTTClient.prototype, "onConnectionSuccess", {
        //events for the MQTT Client
        get: function () { return this.connectionSuccess; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MQTTClient.prototype, "onConnectionFailure", {
        get: function () { return this.connectionFailure; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MQTTClient.prototype, "onConnectionLost", {
        get: function () { return this.connectionLost; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MQTTClient.prototype, "onMessageArrived", {
        get: function () { return this.messageArrived; },
        enumerable: true,
        configurable: true
    });
    MQTTClient.prototype.connect = function (username, password) {
        var _this = this;
        if (this.connected) {
            return;
        }
        ;
        var connectOptions = {
            userName: username,
            password: password,
            useSSL: this.useSSL,
            onSuccess: function () {
                _this.connectionSuccess.trigger();
                _this.connected = true;
            },
            onFailure: function (err) {
                _this.connectionFailure.trigger(err.message);
            }
        };
        this.mqttClient.onConnectionLost = function (err) {
            _this.connectionLost.trigger(err.errorMessage);
            _this.connected = false;
        };
        this.mqttClient.onMessageArrived = function (message) {
            _this.messageArrived.trigger(new common_1.Message(message));
        };
        this.mqttClient.connect(connectOptions);
    };
    MQTTClient.prototype.subscribe = function (topic) {
        this.mqttClient.subscribe(topic);
    };
    MQTTClient.prototype.unsubscribe = function (topic) {
        this.mqttClient.unsubscribe(topic);
    };
    MQTTClient.prototype.publish = function (message) {
        this.mqttClient.send(message);
    };
    return MQTTClient;
}());
exports.MQTTClient = MQTTClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUErRDtBQUMvRCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFFakM7SUFjRSxvQkFBWSxPQUFXO1FBTGYsc0JBQWlCLEdBQUcsSUFBSSxxQkFBWSxFQUFRLENBQUM7UUFDN0Msc0JBQWlCLEdBQUcsSUFBSSxxQkFBWSxFQUFVLENBQUM7UUFDL0MsbUJBQWMsR0FBRyxJQUFJLHFCQUFZLEVBQVUsQ0FBQztRQUM1QyxtQkFBYyxHQUFHLElBQUkscUJBQVksRUFBVyxDQUFDO1FBR25EOzs7Ozs7O1VBT0U7UUFDRixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLElBQUksV0FBVyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUM7UUFDdEMsRUFBRSxDQUFBLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztRQUMxQyxJQUFJO1lBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFDLEdBQUcsR0FBQyxFQUFFLENBQUM7UUFDcEMsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLElBQUksYUFBSSxFQUFFLENBQUM7UUFDM0MsSUFBSSxDQUFDLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsSUFBSSxLQUFLLENBQUM7UUFHNUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xGLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7SUFFdkMsQ0FBQztJQUFBLENBQUM7SUFHRixzQkFBVywyQ0FBbUI7UUFEOUIsNEJBQTRCO2FBQzVCLGNBQWlELE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUNqRixzQkFBVywyQ0FBbUI7YUFBOUIsY0FBbUQsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBQ25GLHNCQUFXLHdDQUFnQjthQUEzQixjQUFnRCxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBQzdFLHNCQUFXLHdDQUFnQjthQUEzQixjQUFpRCxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBRXZFLDRCQUFPLEdBQWQsVUFBZSxRQUFRLEVBQUUsUUFBUTtRQUFqQyxpQkE0QkM7UUEzQkMsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBLENBQUM7WUFDakIsTUFBTSxDQUFDO1FBQ1QsQ0FBQztRQUFBLENBQUM7UUFFRixJQUFJLGNBQWMsR0FBRztZQUNuQixRQUFRLEVBQUUsUUFBUTtZQUNsQixRQUFRLEVBQUUsUUFBUTtZQUNsQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbkIsU0FBUyxFQUFFO2dCQUNULEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDakMsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDeEIsQ0FBQztZQUNELFNBQVMsRUFBRSxVQUFDLEdBQVE7Z0JBQ2xCLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzlDLENBQUM7U0FDRixDQUFBO1FBRUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsR0FBRyxVQUFDLEdBQUc7WUFDbkMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzlDLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQzNCLENBQUMsQ0FBQTtRQUVELElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLEdBQUcsVUFBQyxPQUFXO1lBQzNDLEtBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksZ0JBQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ3RELENBQUMsQ0FBQTtRQUVELElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFTSw4QkFBUyxHQUFoQixVQUFpQixLQUFZO1FBQzNCLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFTSxnQ0FBVyxHQUFsQixVQUFtQixLQUFZO1FBQzdCLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFTSw0QkFBTyxHQUFkLFVBQWUsT0FBZ0I7UUFDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVILGlCQUFDO0FBQUQsQ0FBQyxBQXRGRCxJQXNGQztBQUVRLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUV2ZW50LCBFdmVudEhhbmRsZXIsIGd1aWQsIE1lc3NhZ2UgfSBmcm9tICcuL2NvbW1vbic7XG5sZXQgTVFUVCA9IHJlcXVpcmUoJy4vbXF0dHdzMzEnKTtcblxuY2xhc3MgTVFUVENsaWVudCB7XG4gIHByaXZhdGUgbXF0dENsaWVudDtcbiAgcHJpdmF0ZSBob3N0OiBzdHJpbmc7XG4gIHByaXZhdGUgcG9ydDogbnVtYmVyO1xuICBwcml2YXRlIHBhdGg6IHN0cmluZztcbiAgcHJpdmF0ZSB1c2VTU0w6IGJvb2xlYW47XG4gIHB1YmxpYyBjbGllbnRJZDogc3RyaW5nO1xuICBwdWJsaWMgY29ubmVjdGVkOiBib29sZWFuO1xuICBwcml2YXRlIHJldHJ5T25EaXNjb25uZWN0OiBib29sZWFuO1xuICBwcml2YXRlIGNvbm5lY3Rpb25TdWNjZXNzID0gbmV3IEV2ZW50SGFuZGxlcjx2b2lkPigpO1xuICBwcml2YXRlIGNvbm5lY3Rpb25GYWlsdXJlID0gbmV3IEV2ZW50SGFuZGxlcjxzdHJpbmc+KCk7XG4gIHByaXZhdGUgY29ubmVjdGlvbkxvc3QgPSBuZXcgRXZlbnRIYW5kbGVyPHN0cmluZz4oKTtcbiAgcHJpdmF0ZSBtZXNzYWdlQXJyaXZlZCA9IG5ldyBFdmVudEhhbmRsZXI8TWVzc2FnZT4oKTtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOmFueSl7XG4gICAgLyogb3B0aW9uc1xuICAgICAgaG9zdDogc3RyaW5nXG4gICAgICBwb3J0OiBpbnQgLSBkZWZhdWx0IDgwIHwgdXNlU1NMIDQ0M1xuICAgICAgcGF0aDogc3RyaW5nIC0gZGVmYXVsdCBlbXB0eVxuICAgICAgdXNlU1NMOiBib29sIC0gZGVmYXVsdCBmYWxzZVxuICAgICAgY2xpZW50SWQ6IHN0cmluZyAtIGRlZmF1bHQgVVVJRFxuICAgICAgcmV0cnlPbkRpc2Nvbm5lY3Q6IGJvb2wgLSBkZWZhdWx0IGZhbHNlXG4gICAgKi9cbiAgICB0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xuICAgIHRoaXMuaG9zdCA9IG9wdGlvbnMuaG9zdCB8fCAnbG9jYWxob3N0JztcbiAgICB0aGlzLnVzZVNTTCA9IG9wdGlvbnMudXNlU1NMIHx8IGZhbHNlO1xuICAgIGlmKG9wdGlvbnMucG9ydCkgdGhpcy5wb3J0ID0gb3B0aW9ucy5wb3J0O1xuICAgIGVsc2UgdGhpcy5wb3J0ID0gdGhpcy51c2VTU0w/NDQzOjgwO1xuICAgIHRoaXMucGF0aCA9IG9wdGlvbnMucGF0aCB8fCAnJztcbiAgICB0aGlzLmNsaWVudElkID0gb3B0aW9ucy5jbGllbnRJZCB8fCBndWlkKCk7XG4gICAgdGhpcy5yZXRyeU9uRGlzY29ubmVjdCA9IG9wdGlvbnMucmV0cnlPbkRpc2Nvbm5lY3QgfHwgZmFsc2U7XG5cblxuICAgIHRoaXMubXF0dENsaWVudCA9IG5ldyBNUVRULkNsaWVudCh0aGlzLmhvc3QsIHRoaXMucG9ydCwgdGhpcy5wYXRoLCB0aGlzLmNsaWVudElkKTtcbiAgICB0aGlzLm1xdHRDbGllbnQudXNlU1NMID0gdGhpcy51c2VTU0w7XG5cbiAgfTtcblxuICAvL2V2ZW50cyBmb3IgdGhlIE1RVFQgQ2xpZW50XG4gIHB1YmxpYyBnZXQgb25Db25uZWN0aW9uU3VjY2VzcygpOiBJRXZlbnQ8dm9pZD4geyByZXR1cm4gdGhpcy5jb25uZWN0aW9uU3VjY2VzczsgfVxuICBwdWJsaWMgZ2V0IG9uQ29ubmVjdGlvbkZhaWx1cmUoKTogSUV2ZW50PHN0cmluZz4geyByZXR1cm4gdGhpcy5jb25uZWN0aW9uRmFpbHVyZTsgfVxuICBwdWJsaWMgZ2V0IG9uQ29ubmVjdGlvbkxvc3QoKTogSUV2ZW50PHN0cmluZz4geyByZXR1cm4gdGhpcy5jb25uZWN0aW9uTG9zdDsgfVxuICBwdWJsaWMgZ2V0IG9uTWVzc2FnZUFycml2ZWQoKTogSUV2ZW50PE1lc3NhZ2U+IHsgcmV0dXJuIHRoaXMubWVzc2FnZUFycml2ZWQ7IH1cblxuICBwdWJsaWMgY29ubmVjdCh1c2VybmFtZSwgcGFzc3dvcmQpe1xuICAgIGlmKHRoaXMuY29ubmVjdGVkKXtcbiAgICAgIHJldHVybjtcbiAgICB9O1xuXG4gICAgbGV0IGNvbm5lY3RPcHRpb25zID0ge1xuICAgICAgdXNlck5hbWU6IHVzZXJuYW1lLFxuICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkLFxuICAgICAgdXNlU1NMOiB0aGlzLnVzZVNTTCxcbiAgICAgIG9uU3VjY2VzczogKCkgPT4ge1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb25TdWNjZXNzLnRyaWdnZXIoKTtcbiAgICAgICAgdGhpcy5jb25uZWN0ZWQgPSB0cnVlO1xuICAgICAgfSxcbiAgICAgIG9uRmFpbHVyZTogKGVycjogYW55KSA9PiB7XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbkZhaWx1cmUudHJpZ2dlcihlcnIubWVzc2FnZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5tcXR0Q2xpZW50Lm9uQ29ubmVjdGlvbkxvc3QgPSAoZXJyKSA9PiB7XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbkxvc3QudHJpZ2dlcihlcnIuZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLm1xdHRDbGllbnQub25NZXNzYWdlQXJyaXZlZCA9IChtZXNzYWdlOmFueSkgPT4ge1xuICAgICAgICB0aGlzLm1lc3NhZ2VBcnJpdmVkLnRyaWdnZXIobmV3IE1lc3NhZ2UobWVzc2FnZSkpO1xuICAgIH1cblxuICAgIHRoaXMubXF0dENsaWVudC5jb25uZWN0KGNvbm5lY3RPcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBzdWJzY3JpYmUodG9waWM6c3RyaW5nKXtcbiAgICB0aGlzLm1xdHRDbGllbnQuc3Vic2NyaWJlKHRvcGljKTtcbiAgfVxuXG4gIHB1YmxpYyB1bnN1YnNjcmliZSh0b3BpYzpzdHJpbmcpe1xuICAgIHRoaXMubXF0dENsaWVudC51bnN1YnNjcmliZSh0b3BpYyk7XG4gIH1cblxuICBwdWJsaWMgcHVibGlzaChtZXNzYWdlOiBNZXNzYWdlKXtcbiAgICB0aGlzLm1xdHRDbGllbnQuc2VuZChtZXNzYWdlKTtcbiAgfVxuXG59XG5cbmV4cG9ydCB7IE1RVFRDbGllbnQgfVxuIl19