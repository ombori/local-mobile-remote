# Local Mobile Remote

## An PoC mobile remote implementation for Ombori Grid

The app can be opened from local network using http://device-ip:8081 address.

If `messaging` module is installed on a device, http://device-name:8081 address can also be used.

The module is serving a web page, which can be opened on a mobile device from local network. 
When opened, a bobile web app establishes a connection to the module via websockets, and prints all incoming messages.
If user taps screen, a `Test.ping` message is sent to server. This event is then proxied to system message bus and will be automatically replied to by `agent` module.

List of messages allowed to be proxied between message bus and the mobile app is controlled by `allowedMessages.incoming` and `allowedMessages.outgoing` options for proxy object. 

### TODO

- reconnection logic for websocket
- secure server
- react application instead of static apps