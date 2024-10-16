export enum EventType {
  NewTokens = 'new-tokens',
  Error = 'error'
}

export type EventDataMap = {
  [EventType.NewTokens]: { accessToken?: string; refreshToken?: string; };
  [EventType.Error]: any;
};

export type EventCallbackMap = {
  [EventType.NewTokens]: (data: EventDataMap[EventType.NewTokens]) => void;
  [EventType.Error]: (error: EventDataMap[EventType.Error]) => void;
};

export class EventEmitter {

  private callbacksByType: {
    [K in EventType]: EventCallbackMap[K][]
  } = {
    [EventType.NewTokens]: [],
    [EventType.Error]: [],
  };

  on<T extends EventType>(eventType: T, eventCallback: EventCallbackMap[T]): void {
    this.callbacksByType[eventType].push(eventCallback);
  }

  emit<T extends  EventType>(eventType: T, data: EventDataMap[T]): void {
    this.callbacksByType[eventType].forEach(
      callback => callback(data)
    );
  }

  off<T extends  EventType>(eventType: T, eventCallback: EventCallbackMap[T]): void {
    this.callbacksByType[eventType] = this.callbacksByType[eventType].filter(
      callback => callback !== eventCallback
    );
  }

}
