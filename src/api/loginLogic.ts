// created by flemming

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
export function LoginUser(userinfo: UserInfo): boolean {
  console.log(userinfo);
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
export function RegistrationUser(userinfo: UserInfo): boolean {
  console.log(userinfo);
  if (userinfo) {
    localStorage.setItem(
      "user",
      JSON.stringify({
        username: userinfo.username,
        password: userinfo.password,
      })
    );
    console.log("user saved to local storage");
    return true;
  } else {
    console.log("save to local storage failed");
    return false;
  }
}
