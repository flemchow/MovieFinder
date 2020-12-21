// created by flemming
import { accountServerURL } from "./constants";
/**
 * typing used for defining what is being expected
 */
interface UserInfo {
  username: string;
  password: string;
}

/**
 * fucntion used to recieve and log in an user
 * @param userinfo user info {username: string, password: string}
 */
export async function LoginUser(userinfo: UserInfo): Promise<boolean> {
  if (userinfo) {
    const user = JSON.parse(localStorage.getItem("user")!);
    if (
      user.username === userinfo.username &&
      user.password === userinfo.password
    ) {
      console.log("user authenticated");
      return true;
    } else {
      console.log("credentials are flawed");
      return false;
    }
  } else {
    console.log("no user credentials provided");
    return false;
  }
}

/**
 * fucntion used to recieve and register a new user
 * @param userinfo user info {username: string, password: string}
 */
export async function RegistrationUser(userinfo: UserInfo): Promise<boolean> {
  console.log(userinfo);
  if (userinfo) {
    const res = await fetch(`${accountServerURL}register`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userinfo),
    });
    console.log(res.status);
    if (res.status == 200) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
