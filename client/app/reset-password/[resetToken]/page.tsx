"use client";

import { useUserContext } from "@/context/userContext";
import React, { useState } from "react";
import toast from "react-hot-toast";

async function ResetPasswordPage({
  params,
}: {
  params: Promise<{ resetToken: string }>;
}) {
  const { resetToken } = await params; // Await the promise to resolve
  const { resetPassword } = useUserContext();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    resetPassword(resetToken, password);
  };

  return (
    <main className="auth-page w-full h-full flex justify-center items-center">
      <form
        className="m-[2rem] px-10 py-14 rounded-lg bg-white max-w-[520px] w-full"
        onSubmit={handleSubmit}
      >
        <div className="relative z-10">
          <h1 className="mb-2 text-center text-[1.35rem] font-medium">
            Reset Your Password!
          </h1>
          <div className="relative mt-[1rem] flex flex-col">
            <label htmlFor="password" className="mb-1 text-[#999]">
              New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              id="password"
              name="password"
              placeholder="*********"
              className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-gray-800"
            />
            <button
              className="absolute p-1 right-4 top-[43%] text-[22px] text-[#999] opacity-45"
              onClick={togglePassword}
              type="button"
            >
              {showPassword ? (
                <i className="fas fa-eye-slash"></i>
              ) : (
                <i className="fas fa-eye"></i>
              )}
            </button>
          </div>
          <div className="relative mt-[1rem] flex flex-col">
            <label htmlFor="confirmPassword" className="mb-1 text-[#999]">
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="*********"
              className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-gray-800"
            />
            <button
              className="absolute p-1 right-4 top-[43%] text-[22px] text-[#999] opacity-45"
              onClick={togglePassword}
              type="button"
            >
              {showPassword ? (
                <i className="fas fa-eye-slash"></i>
              ) : (
                <i className="fas fa-eye"></i>
              )}
            </button>
          </div>
          <div className="flex">
            <button
              type="submit"
              className="mt-[1.5rem] flex-1 px-4 py-3 font-bold bg-[#2ECC71] text-white rounded-md hover:bg-[#1abc9c] transition-colors"
            >
              Reset Password
            </button>
          </div>
        </div>
        <img src="/flurry.png" alt="Background Illustration" />
      </form>
    </main>
  );
}

export default ResetPasswordPage