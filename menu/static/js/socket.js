class Socket extends WebSocket {
    constructor() {
        super(`ws://${window.location.host}/ws/burger-queen/`)
        
        this.onopen = event => {
            console.log('Socket opened on ' + event)
        };

        this.onmessage = event => {
            // Handle received message
        };

        this.onclose = event => {
            // Handle connection close
        };
    }

}
new Socket();