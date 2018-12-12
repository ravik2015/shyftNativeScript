import { IEvent, EventHandler, guid, Message } from './common';
let MQTT = require('./mqttws31');

class MQTTClient {
  private mqttClient;
  private host: string;
  private port: number;
  private path: string;
  private useSSL: boolean;
  public clientId: string;
  public connected: boolean;
  private retryOnDisconnect: boolean;
  private connectionSuccess = new EventHandler<void>();
  private connectionFailure = new EventHandler<string>();
  private connectionLost = new EventHandler<string>();
  private messageArrived = new EventHandler<Message>();

  constructor(options:any){
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
    if(options.port) this.port = options.port;
    else this.port = this.useSSL?443:80;
    this.path = options.path || '';
    this.clientId = options.clientId || guid();
    this.retryOnDisconnect = options.retryOnDisconnect || false;


    this.mqttClient = new MQTT.Client(this.host, this.port, this.path, this.clientId);
    this.mqttClient.useSSL = this.useSSL;

  };

  //events for the MQTT Client
  public get onConnectionSuccess(): IEvent<void> { return this.connectionSuccess; }
  public get onConnectionFailure(): IEvent<string> { return this.connectionFailure; }
  public get onConnectionLost(): IEvent<string> { return this.connectionLost; }
  public get onMessageArrived(): IEvent<Message> { return this.messageArrived; }

  public connect(username, password){
    if(this.connected){
      return;
    };

    let connectOptions = {
      userName: username,
      password: password,
      useSSL: this.useSSL,
      onSuccess: () => {
        this.connectionSuccess.trigger();
        this.connected = true;
      },
      onFailure: (err: any) => {
        this.connectionFailure.trigger(err.message);
      }
    }

    this.mqttClient.onConnectionLost = (err) => {
        this.connectionLost.trigger(err.errorMessage);
        this.connected = false;
    }

    this.mqttClient.onMessageArrived = (message:any) => {
        this.messageArrived.trigger(new Message(message));
    }

    this.mqttClient.connect(connectOptions);
  }

  public subscribe(topic:string){
    this.mqttClient.subscribe(topic);
  }

  public unsubscribe(topic:string){
    this.mqttClient.unsubscribe(topic);
  }

  public publish(message: Message){
    this.mqttClient.send(message);
  }

}

export { MQTTClient }
