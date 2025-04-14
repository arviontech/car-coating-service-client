"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerSchema } from "@/Schemas/Schema";
import { useState } from "react";
import { useRegisterMutation } from "@/redux/api/authApi";
import GlassLoader from "@/components/shared/GlassLoader";

type RegisterFormInputs = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [signup, { isLoading: isPending }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      const res = await signup(data).unwrap();

      if (res?.data?.email) {
        toast.success("Registration successful! Please login.");
        router.push("/login");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(
        error?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="  flex items-center justify-center">
      {isPending && <GlassLoader />}

      <div className="w-full bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
        <div className="p-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="col-span-1">
              <label className="block text-gray-300 mb-2">Full Name</label>
              <input
                {...register("name")}
                type="text"
                className="w-full px-3 py-2 bg-gray-800/50 border border-blue-900/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-100 placeholder-blue-300/30"
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="mt-1 text-red-400">{errors.name.message}</p>
              )}
            </div>

            <div className="col-span-1">
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

            <div className="col-span-1">
              <label className="block text-gray-300 mb-2">Contact Number</label>
              <input
                {...register("contact")}
                type="tel"
                className="w-full px-3 py-2 bg-gray-800/50 border border-blue-900/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-100 placeholder-blue-300/30"
                placeholder="+1 234 567 890"
              />
              {errors.contact && (
                <p className="mt-1 text-red-400">{errors.contact.message}</p>
              )}
            </div>

            <div className="col-span-1">
              <label className="block text-gray-300 mb-2">Gender</label>
              <select
                {...register("gender")}
                className="w-full px-3 py-2 bg-gray-800/50 border border-blue-900/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-100 placeholder-blue-300/30"
              >
                <option value="">Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
              {errors.gender && (
                <p className="mt-1 text-red-400">{errors.gender.message}</p>
              )}
            </div>

            <div className="col-span-1">
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
                  {isVisible ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-red-400">{errors.password.message}</p>
              )}
            </div>

            <div className="col-span-1">
              <label className="block text-gray-300 mb-2">
                Confirm Password
              </label>
              <input
                {...register("confirmPassword")}
                type={isVisible ? "text" : "password"}
                className="w-full px-3 py-2 bg-gray-800/50 border border-blue-900/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-100 placeholder-blue-300/30"
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-red-400">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block text-gray-300 mb-2">
                Address (Optional)
              </label>
              <textarea
                {...register("address")}
                className="w-full px-3 py-2 bg-gray-800/50 border border-blue-900/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-100 placeholder-blue-300/30"
                placeholder="123 Main St, Your City"
                rows={2}
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-lg text-white font-medium shadow-lg shadow-blue-900/20 transition-all duration-200"
                disabled={isPending}
              >
                {isPending ? "Creating account..." : "Create Account"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
