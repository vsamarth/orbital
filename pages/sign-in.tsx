import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import useUser from "../hooks/user";

interface FormValues {
  email: string;
  password: string;
}

function SignInForm() {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    // resolver: yupResolver(signupSchema),
  });

  const {user,isLoading,isSignedIn} = useUser();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(isSignedIn) {
    router.push('/dashboard')
    return <div>Loading...</div>;
  }
  return (
    <div className="bg-slate-100 min-h-screen grid place-items-center">
      <button
        className="border border-slate-800 h-11 rounded"
        onClick={() =>
          Auth.federatedSignIn({
            provider: CognitoHostedUIIdentityProvider.Google,
          })
        }
      >
        Sign in with Google
      </button>
      <form
        className=" p-6"
        onSubmit={handleSubmit(async (data) => {
          // await Auth.confirmSignUp(data.email, '721706')
          await Auth.signIn(data.email, data.password);
        })}
        noValidate
      >
        <div>{errors.email?.message}</div>
        <div className="flex flex-col gap-8">
          <Input type="email" label="Email Address" {...register("email")} />
          <Input type="password" label="Password" {...register("password")} />
          <button
            type="submit"
            className="mt-2 hover:bg-slate-800 focus:ring ring-offset-1 ring-slate-800 transition-all outline-none bg-slate-900 text-slate-50 h-11 font-semibold tracking-wide rounded"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}

function SignIn() {
  const { user, isLoading } = useUser();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <SignInForm />;
}

export default SignIn;
