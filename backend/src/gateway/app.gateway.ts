import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';

import { Server, Socket } from 'socket.io'

@WebSocketGateway({
	cors: {origin: '*'},
	namespace: 'ws',
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect{
	@WebSocketServer()
	server: Server;

	handleConnection(client: Socket){
	console.log(`✅ Client connected: ${client.id}`)
	}
	handleDisconnect(client: Socket) {
		console.log(`❌ Client disconnected: ${client.id}`)
	}
	emitMonitorStatus(data: {monitorId: string; status: 'UP' | 'DOWN'}){
		this.server.emit('monitor:status', data)
	}

	  emitLog(data: object) {
    this.server.emit('log:new', data)
  }
	 emitIncident(data: object) {
    this.server.emit('incident:new', data)
  }
}