import { backendWebsocketUrl } from "./consts"
import { IWebSocketSend } from "./types"

export class MessagesAPI {
    protected socket: WebSocket

    constructor(
        userId: number,
        chatId: number,
        token: string,
        callback: {
            onOpen: () => void
            onClose: (event: CloseEvent) => void
            onError: (event: ErrorEvent) => void
            onMessage: (event: MessageEvent) => void
        }
    ) {
        this.socket = new WebSocket(
            `${backendWebsocketUrl}/${userId}/${chatId}/${token}`
        )

        this.socket.addEventListener("open", callback.onOpen)
        this.socket.addEventListener("close", callback.onClose)
        this.socket.addEventListener("message", callback.onMessage)

        // @ts-expect-error
        this.socket.addEventListener("error", callback.onError)
    }

    private _send(data: IWebSocketSend) {
        return this.socket.send(JSON.stringify(data))
    }

    sendMessage(content: string) {
        return this._send({ content, type: "message" })
    }

    requestMessages(from: number) {
        return this._send({ content: String(from), type: "get old" })
    }

    ping() {
        return this._send({ content: "", type: "ping" })
    }

    close() {
        return this.socket.close()
    }
}
