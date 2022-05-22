import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import useUser from "../hooks/user";

function Dashboard() {
  const { user, isLoading, isSignedIn } = useUser();
  const router = useRouter();

  if (isLoading || !isSignedIn) {
    if (!isLoading) {
      router.push("/sign-in");
    }
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div>Hello {user?.name}</div>
      <button onClick={() => Auth.signOut()}>Sign Out</button>
    </div>
  );
}
export default Dashboard;
