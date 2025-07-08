import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import google from "../../assets/images/google.png";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Context/AuthProvider";
import toast from "react-hot-toast";

const SignUp = () => {
  const { continueWithGoogle, createUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const savedUsers = (name, email) => {
    const user = { name, email };

    fetch("https://mobile-shop-silk.vercel.app/users/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Signup Successfully Done");
        }
      });
  };

  const handleSignUp = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        const userInfo = { displayName: data.name };

        savedUsers(data.name, data.email);

        updateUser(userInfo)
          .then(() => {
            navigate("/");
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
          toast.error("Email Already in Use");
        } else {
          toast.error("Something went wrong");
        }
      });
  };

  const googleSignIn = () => {
    continueWithGoogle()
      .then((result) => {
        if (result.user) {
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
        <h1 className="text-4xl font-semibold text-center text-primary mb-6">Sign Up Now</h1>
        <div className="card bg-white w-full shadow-xl rounded-lg">
          <div className="card-body">
            <form onSubmit={handleSubmit(handleSignUp)} className="space-y-3">
              {/* Name */}
              <div>
                <label className="label font-semibold">Name</label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="input input-bordered w-full"
                  placeholder="Your Name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="label font-semibold">Email</label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="input input-bordered w-full"
                  placeholder="Your Email"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="label font-semibold">Password</label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be 6 characters or more",
                    },
                    pattern: {
                      value: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*[!#$@%^&])(?=.*?[0-9])/,
                      message:
                        "Must include uppercase, lowercase, number, and special character",
                    },
                  })}
                  className="input input-bordered w-full"
                  placeholder="Password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              <div className="text-sm">
                Already have an account?{" "}
                <Link to="/sign-in" className="text-primary hover:underline font-medium">
                  Login here
                </Link>
              </div>

              <input
                type="submit"
                value="Sign Up"
                className="btn btn-primary w-full text-white"
              />
            </form>

            <div className="divider my-4">or</div>

            <button
              onClick={googleSignIn}
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

export default SignUp;
