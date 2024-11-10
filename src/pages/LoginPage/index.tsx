import React, { FormEvent, useState } from "react";
import Swal from "sweetalert2";
import IconButton from "../../components/IconButton/IconButton";
import GoogleIcon from "../../svgIcons/GoogleIcon";
import Divider from "../../components/Divider/Divider";
import TextInputField from "../../components/TextInputField/TextInputField";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

// Define the type for form state
interface FormState {
  email: string;
  password: string;
}

const LoginPage = () => {
  const { loginWithUserEmailAndPassword, signInWithGoogle } = useAppContext();
  const navigate = useNavigate();
  // Initialize form state with correct types
  const [formState, setFormState] = useState<FormState>({
    email: "",
    password: "",
  });

  // Handle change for form inputs
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = formState;
    const success = await loginWithUserEmailAndPassword(email, password);
    if (success) {
      navigate("/");
    } else {
      Swal.fire({
        title: "Error!",
        text: "Login failed. Please check your credentials and try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
    // handle form submission
    console.log(formState); // You can add your form submission logic here
  };

  const handleGoogleSignIn = async () => {
    const success = await signInWithGoogle();
    if (success) navigate("/");
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            alt="Your Company"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <TextInputField
                id="email"
                name="email"
                label="Email address"
                type="email"
                required
                autoComplete="email"
                value={formState.email}
                onChange={handleChange}
              />

              <TextInputField
                id="password"
                name="password"
                label="Password"
                type="password"
                required
                autoComplete="current-password"
                value={formState.password}
                onChange={handleChange}
              />

              <div>
                <CustomButton
                  bgColor="bg-indigo-600"
                  textColor="text-white"
                  label="Sign in"
                  type="submit"
                />
              </div>
            </form>

            <div>
              <div className="relative mt-10">
                <Divider />
                <div className="relative flex justify-center text-sm/6 font-medium">
                  <span className="bg-white px-6 text-gray-900">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <IconButton
                  label="Sign In with Google"
                  href="#"
                  icon={GoogleIcon}
                  onClick={handleGoogleSignIn}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
