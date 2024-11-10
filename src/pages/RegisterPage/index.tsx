import React, { FormEvent, useState } from "react";
import IconButton from "../../components/IconButton/IconButton";
import GoogleIcon from "../../svgIcons/GoogleIcon";
import Divider from "../../components/Divider/Divider";
import TextInputField from "../../components/TextInputField/TextInputField";
import CustomButton from "../../components/CustomButton/CustomButton";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

interface FormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const RegisterPage = () => {
  const navigate = useNavigate();
  const { registerWithGoogle, registerWithUserEmailAndPassword } =
    useAppContext();
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string>("");
  // Handle change for form inputs
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError("");
  };

  const handleRegisterGoogle = async () => {
    const success = await registerWithGoogle();
    if (success) navigate("/");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, email, password, confirmPassword } = formState;

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    } else {
      setError("");
    }

    const success = await registerWithUserEmailAndPassword(
      name,
      email,
      password
    );
    if (success) {
      navigate("/");
    }
    // else {
    //   Swal.fire({
    //     title: "Error!",
    //     text: "Registration failed. Please try again.",
    //     icon: "error",
    //     confirmButtonText: "OK",
    //   });
    // }
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
            Create an account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <TextInputField
                id="name"
                name="name"
                label="Name"
                type="text"
                required
                autoComplete=""
                value={formState.name}
                onChange={handleChange}
              />

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

              <TextInputField
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                required
                autoComplete="current-password"
                value={formState.confirmPassword}
                onChange={handleChange}
              />
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <div>
                <CustomButton
                  bgColor="bg-indigo-600"
                  textColor="text-white"
                  label="Register"
                  type="submit"
                />
              </div>
            </form>

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
                label="Register with Google"
                href="#"
                icon={GoogleIcon}
                onClick={handleRegisterGoogle}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;