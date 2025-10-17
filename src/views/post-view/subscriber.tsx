"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import styles from "./styles.module.css";

export default function Subscriber() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return setError("Email is required");
    if (!emailRegex.test(email)) return setError("Please enter a valid email address");

    setError("");
    alert(`Subscribed with ${email}`);
    setEmail("");
  };

  return (
    <div className={styles.subscriberWrapper}>
      {/* Heading */}
      <div className={styles.subscriberHeading}>
        <h2 className={styles.subscriberTitle}>Never Miss An Update.</h2>
        <p className={styles.subscriberDescription}>
          Be a part of our community by subscribing to our newsletter.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className={styles.subscriberForm}>
        <div className={styles.inputWrapper}>
          <Label htmlFor="email" className="sr-only">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.inputField}
          />
          {error && <p className={styles.inputError}>{error}</p>}
        </div>

        <Button type="submit" className={styles.submitButton}>
          Subscribe Now
        </Button>
      </form>

      {/* Blurred Background */}
      <div
        className={styles.blurredBackground}
        style={{ top: "50%", right: "-15%", transform: "translateY(-50%)" }}
      />
    </div>
  );
}
