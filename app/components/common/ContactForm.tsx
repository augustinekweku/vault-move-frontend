import { useState } from "react";
import { Input, Textarea } from "~/components/ui/Input";
import { Button } from "~/components/ui/Button";

export function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function update(field: keyof typeof values) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((v) => ({ ...v, [field]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Wire to a contact endpoint via ~/services/api when available.
    setSubmitted(true);
    setValues({ name: "", email: "", message: "" });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <Input
        label="Full Name"
        placeholder="eg. Jane Doe"
        value={values.name}
        onChange={update("name")}
        required
      />
      <Input
        type="email"
        label="Email Address"
        placeholder="eg. Janedoe@gmail.com"
        value={values.email}
        onChange={update("email")}
        required
      />
      <Textarea
        label="Message"
        rows={5}
        placeholder="Your message here"
        value={values.message}
        onChange={update("message")}
        required
      />
      <Button type="submit" variant="dark" className="w-full">
        Next
      </Button>
      {submitted && (
        <p className="text-sm text-accent-strong">
          Thanks! We'll be in touch shortly.
        </p>
      )}
    </form>
  );
}
