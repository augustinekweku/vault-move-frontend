import { useState } from "react";
import { Link } from "react-router";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { PasswordField } from "~/components/auth/PasswordField";
import { CheckIcon, CloseIcon } from "~/components/ui/icons";

const PASSWORD_RULES = [
  {
    id: "length",
    label: "At least 8 characters long",
    test: (p: string) => p.length >= 8,
  },
  {
    id: "uppercase",
    label: "At least one uppercase letter",
    test: (p: string) => /[A-Z]/.test(p),
  },
  {
    id: "lowercase",
    label: "At least one lowercase letter",
    test: (p: string) => /[a-z]/.test(p),
  },
  {
    id: "number",
    label: "At least one number",
    test: (p: string) => /\d/.test(p),
  },
  {
    id: "special",
    label: "At least one special character",
    test: (p: string) => /[^A-Za-z0-9]/.test(p),
  },
];

/** Sign-up step 1 (buyer/renter): account details. The password rules list
 *  appears while the password field is focused, ticking rules live. */
export function SignUpForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [passwordFocused, setPasswordFocused] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO(step 2): persist step-1 details and advance the sign-up flow.
  }

  return (
    <div>
      <h1 className="text-[29.08px] leading-9 font-semibold text-ink">
        Hello There!
      </h1>
      <p className="mt-1.5 text-lg leading-8 text-ink-soft">
        Enter your details to set up your account.
      </p>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        <Input
          label="Full Name"
          name="fullName"
          placeholder="eg Jane Doe"
          autoComplete="name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
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

        <div>
          <PasswordField
            label="Password"
            name="password"
            autoComplete="new-password"
            value={password}
            onChange={setPassword}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            required
          />
          {passwordFocused && (
            <ul className="mt-2 space-y-1">
              {PASSWORD_RULES.map((rule) => {
                const met = rule.test(password);
                return (
                  <li
                    key={rule.id}
                    className={cn(
                      "flex items-center gap-1.5 text-[11px] leading-4",
                      met ? "text-accent" : "text-muted-500",
                    )}
                  >
                    {met ? (
                      <CheckIcon className="size-3" />
                    ) : (
                      <CloseIcon className="size-3 text-red-600" />
                    )}
                    {rule.label}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <PasswordField
          label="Retype Password"
          name="retypePassword"
          autoComplete="new-password"
          value={retypePassword}
          onChange={setRetypePassword}
          required
        />

        <p className="text-[13px] leading-6 text-ink-soft">
          By clicking the{" "}
          <strong className="font-semibold text-ink">
            &lsquo;Create account&rsquo;
          </strong>{" "}
          button, you are creating an account with VaultMove and you agree to
          the{" "}
          <Link
            to="/terms"
            className="font-semibold text-ink underline hover:text-brand"
          >
            Terms of Use
          </Link>{" "}
          and{" "}
          <Link
            to="/privacy"
            className="font-semibold text-ink underline hover:text-brand"
          >
            Privacy Policy
          </Link>
          .
        </p>

        <div className="space-y-3">
          <Button type="submit" className="w-full">
            Create Account
          </Button>
          <Button to="/" variant="outline" className="w-full">
            Cancel
          </Button>
        </div>
      </form>

      <p className="mt-6 text-center text-[13px] text-muted-500">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-ink hover:text-brand">
          Login
        </Link>
      </p>
    </div>
  );
}
