import { CognitoUser } from "@aws-amplify/auth";
import { Auth, Hub } from "aws-amplify";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
}

interface UseUserOptions {
  redirect?: boolean;
}

const redirectTo = "/sign-in";

interface UserAttributes {
  email: string;
  email_verified: boolean;
  name: string;
}

interface UserInfo {
  username: string;
  attributes: UserAttributes;
}
function useUser() {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          setUser(data);
          break;
        case "signOut":
          setUser(undefined);
          break;
      }
    });

    async function getUser() {
      try {
        const u: CognitoUser = await Auth.currentAuthenticatedUser();
        const x: UserInfo = await Auth.currentUserInfo();
        console.log(x);
        setUser({
          email: x.attributes.email,
          name: x.attributes.name,
        });
        setIsSignedIn(true);
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    }
    getUser();
    return unsubscribe;
  }, []);

  return {
    user,
    isLoading,
    isSignedIn
  };
}

export default useUser;
