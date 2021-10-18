import sinon from "sinon"
import { expect } from "chai"

import AuthAPI from "./auth_api"
import { backendUrl } from "./consts"
import { ILoginRequest, IRegisterRequest } from "./types"

describe("Test AuthAPI", () => {
  const requests: sinon.SinonFakeXMLHttpRequest[] = []

  beforeEach(() => {
    const xhr: sinon.SinonFakeXMLHttpRequestStatic =
      sinon.useFakeXMLHttpRequest()

    ;(global as any).XMLHttpRequest = sinon.useFakeXMLHttpRequest()

    xhr.onCreate = (request: sinon.SinonFakeXMLHttpRequest) => {
      requests.push(request)
    }
  })

  afterEach(() => {
    ;(global as any).XMLHttpRequest.restore()

    requests.length = 0
  })

  it("login method", () => {
    const api = AuthAPI
    const data: ILoginRequest = {
      login: "testLogin",
      password: "Sl3"
    }

    api.login(data)

    expect(requests.length).to.eq(1)
    expect(requests[0].method).to.eq("POST")
    expect(requests[0].requestBody).to.eq(JSON.stringify(data))
    expect(requests[0].url).to.eq(`${backendUrl}/auth/signin`)
  })
  it("register method", () => {
    const api = AuthAPI
    const data: IRegisterRequest = {
      email: "test@fd.ru",
      first_name: "Тест",
      login: "testLogin",
      password: "Sl3",
      phone: "232342323",
      second_name: "Тестов"
    }

    api.register(data)

    expect(requests.length).to.eq(1)
    expect(requests[0].method).to.eq("POST")
    expect(requests[0].requestBody).to.eq(JSON.stringify(data))
    expect(requests[0].url).to.eq(`${backendUrl}/auth/signup`)
  })
  it("logout method", () => {
    const api = AuthAPI

    api.logout()

    expect(requests.length).to.eq(1)
    expect(requests[0].method).to.eq("POST")
    expect(requests[0].url).to.eq(`${backendUrl}/auth/logout`)
  })
  it("read user method", () => {
    const api = AuthAPI

    api.userRead()

    expect(requests.length).to.eq(1)
    expect(requests[0].method).to.eq("GET")
    expect(requests[0].url).to.eq(`${backendUrl}/auth/user`)
  })
})
