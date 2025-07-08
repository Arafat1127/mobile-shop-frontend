import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import google from "../../assets/images/google.png";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthContext } from "../../Context/AuthProvider";

const SignIn = () => {
  const { signIn, continueWithGoogle } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogIn = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        toast.success("Login Successfully Done");
        reset();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error("Invalid credentials");
      });
  };

  const googleLogin = () => {
    continueWithGoogle()
      .then((result) => {
        const user = result.user;
        if (user) {
          toast.success("Google login Successfully Done");
          navigate("/");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-semibold text-primary text-center mb-6">Sign In Now</h1>
        <div className="card w-full bg-white shadow-xl rounded-lg">
          <div className="card-body">
            <form onSubmit={handleSubmit(handleLogIn)} className="space-y-4">
              {/* Email Field */}
              <div>
                <label className="label font-semibold">Email</label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="input input-bordered w-full"
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="label font-semibold">Password</label>
                <input
                  type="password"
                  {...register("password", { required: "Password is required" })}
                  className="input input-bordered w-full"
                  placeholder="Password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Link to SignUp */}
              <div className="text-sm">
                New to Website?{" "}
                <Link to="/sign-up" className="text-primary hover:underline font-medium">
                  Create an Account
                </Link>
              </div>

              {/* Submit Button */}
              <input
                type="submit"
                value="Sign In"
                className="btn btn-primary w-full text-white mt-2"
              />
            </form>

            {/* Divider */}
            <div className="divider my-4">or</div>

            {/* Google Sign-in */}
            <button
              onClick={googleLogin}
              className="btn w-full bg-white text-black border border-gray-300 hover:bg-gray-100 flex justify-center items-center gap-3"
            >
              <img className="w-6 h-6" src={google} alt="google" />
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
