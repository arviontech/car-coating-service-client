"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import Link from "next/link";
import { loginSchema } from "@/Schemas/Schema";
import { useAppDispatch } from "@/redux/hook";
import { useState } from "react";
import { useLoginMutation } from "@/redux/api/authApi";
import { setUser } from "@/redux/features/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import GlassLoader from "@/components/shared/GlassLoader";

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [login, { isLoading: isPending }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const res = await login(data).unwrap();
      console.log(res);

      if (res?.success) {
        const user: any = verifyToken(res?.data?.accessToken);
        dispatch(setUser({ user, token: res?.data?.accessToken }));

        toast.success(res?.message || "Login successful");
        router.push("/");
      }
    } catch (error: any) {
      console.log(error);

      toast.error(error?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="  flex items-center justify-center ">
      {isPending && <GlassLoader />}

      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
        <div className="p-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-2">Email</label>
              <input
                {...register("email")}
                type="email"
                className="w-full px-3 py-2 bg-gray-800/50 border border-blue-900/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-100 placeholder-blue-300/30"
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Password</label>
              <div className="relative">
                <input
                  {...register("password")}
                  type={isVisible ? "text" : "password"}
                  className="w-full px-3 py-2 bg-gray-800/50 border border-blue-900/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-100 placeholder-blue-300/30"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setIsVisible(!isVisible)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-400"
                >
                  {isVisible ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-red-400">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center justify-end">
              <div className="text-sm">
                <Link
                  href="/forgot-password"
                  className="text-xs text-blue-400 hover:text-blue-300"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-lg text-white font-medium shadow-lg shadow-blue-900/20 transition-all duration-200"
              disabled={isPending}
            >
              {isPending ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
