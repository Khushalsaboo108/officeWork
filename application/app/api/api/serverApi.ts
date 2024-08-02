import { authData, body } from "../../types";
import * as BaseApi from "../api-config/api-config";

class LoginApiService {
  private url = (action: string) => `http://localhost:9000/` + action;

  /**
   * Login user
   * @param userName
   * @param password
   * @param privilege
   * @returns Token
   */
  public async login(
    body: body
  ): Promise<any > {
    return BaseApi.POST(this.url("authCheck"),  body);
  }
}
const AuthApi = new LoginApiService();
export default AuthApi;
