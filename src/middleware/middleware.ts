/**
 * Middleware between web api driver and whatsappJS.
 * Right now this file should not import nor export anything.
 * Until I figure out how to compile this file with the imports inlined.
 * Specifically the [ExposedFns] enum.
 * Maybe by creating a webpack/rollup task
 */

declare module WAPI {
  const waitNewMessages: (rmCallback: boolean, callback: Function) => void;
  const waitNewAcknowledgements: (callback: Function) => void;
  const onStateChanged: (callback: Function) => void;
  const addAllNewMessagesListener: (callback: Function) => void;
}


//THIS SHOULD BE IDENTICAL TO /api/functions/exposed.enum.ts
enum ExposedFns {
  OnMessage = 'onMessage',
  OnAck = 'onAck',
  OnParticipantsChanged = 'onParticipantsChanged',
  OnStateChanged = 'onStateChanged'
}

/**
 * Exposes [OnMessage] function
 */
WAPI.waitNewMessages(false, data => {
  data.forEach(message => {
    window[ExposedFns.OnMessage](message);
  });
});

WAPI.waitNewAcknowledgements(function (data) {
  if (!Array.isArray(data)) {
      data = [data];
  }
  data.forEach(function (message) {
      if(window[ExposedFns.OnAck])window[ExposedFns.OnAck](message);
  });
})

WAPI.onStateChanged(s => window[ExposedFns.OnStateChanged](s.state));