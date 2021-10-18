import { backendUrl } from "./consts"
import { Request } from "../utils/request"

export abstract class BaseAPI {
  protected request: Request

  protected constructor(endpoint: string) {
    this.request = new Request(`${backendUrl}${endpoint}`)
  }
}
