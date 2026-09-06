import { useState } from "react";
import { Link } from "react-router";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { PasswordField } from "~/components/auth/PasswordField";

/** Login form: email + password with a "remember me" checkbox, forgot-
 *  password link, and an outlined sign-up button below the submit. */
export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: authenticate against the API and store the session token.
  }

  return (
    <div>
      <h1 className="text-[29.08px] leading-9 font-semibold text-ink">
        Welcome Back!
      </h1>
      <p className="mt-1.5 text-lg leading-8 text-ink-soft">
        Enter your details to log into your account.
      </p>

      <form className="mt-8 md:mt-12 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <PasswordField
            label="Password"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={setPassword}
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-[13px] text-muted-700">
            <input
              type="checkbox"
              name="remember"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="size-4 accent-brand"
            />
            Remember for 30 days
          </label>
          <Link
            to="/forgot-password"
            className="text-[13px] font-medium text-[#8E8E93] hover:text-ink"
          >
            Forgot password
          </Link>
        </div>

        <Button type="submit" className="w-full">
          Login
        </Button>
        <Button to="/signup" variant="outline" className="w-full">
          Don&rsquo;t have an account? Sign up
        </Button>
      </form>
    </div>
  );
}
