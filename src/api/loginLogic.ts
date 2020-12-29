import { accountServerURL } from "./constants";

interface UserInfo {
  username: string;
  password: string;
}

interface RegisterInfo {
  email: string;
  username: string;
  password: string;
}

export async function tokenRefresh() {
  const data = {
    rtoken: localStorage.getItem("refresh"),
  };
  const res = await fetch(`${accountServerURL}login/token`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.status == 200) {
    res.json().then((data) => {
      localStorage.setItem("access", data.accessToken);
    });
    return true;
  } else {
    localStorage.clear();
    return false;
  }
}

export async function loginUser(userinfo: UserInfo): Promise<boolean> {
  if (userinfo) {
    const res = await fetch(`${accountServerURL}login`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userinfo),
    });

    if (res.status == 200) {
      res.json().then((data) => {
        localStorage.setItem("access", data.accessToken);
        localStorage.setItem("refresh", data.refreshToken);
        localStorage.setItem("username", data.username);
      });
      return true;
    } else {
      return false;
    }
  } else {
    console.log("no user credentials provided");
    return false;
  }
}

export async function registrationUser(
  userinfo: RegisterInfo
): Promise<boolean> {
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
