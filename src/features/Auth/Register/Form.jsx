// libs
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";

// components
import InputField from "../../../components/InputField";

const RegisterForm = (props) => {
  let schema = yup.object().shape({
    name: yup.string().required("Please enter your fullname !"),
    email: yup
      .string()
      .email("Email is invalid !")
      .required("Please enter your email !"),
    phone: yup.string().required("Please enter your phonen number !"),
    password: yup
      .string()
      .min(6, "Password must be 6 charactors at least !")
      .required("Please enter your password !"),
  });

  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      checkbox3: false,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (values, e) => {
    const { onSubmit, loading } = props;
    if (onSubmit) {
      onSubmit(values);
    }
  };

  return (
    <>
      <h1 className="register__heading mb-4">Create an account</h1>

      <form className="register__form" onSubmit={handleSubmit(onSubmit)}>
        <p>
          Already have an account? <Link to="/login">Log in instead!</Link>
        </p>
        <InputField
          errors={errors}
          inputRef={register}
          type="text"
          name="name"
          label="*Fullname"
        />
        <InputField
          errors={errors}
          inputRef={register}
          type="email"
          name="email"
          label="*Email"
        />
        <InputField
          errors={errors}
          inputRef={register}
          type="phone"
          name="phone"
          label="*Phone"
        />
        <InputField
          errors={errors}
          inputRef={register}
          type="password"
          name="password"
          label="*Password"
        />
        <InputField
          errors={errors}
          inputRef={register}
          type="checkbox"
          name="checkbox3"
          label="*I agree to the terms and conditions and the privacy policy"
        />

        <button className="btn btn-dark">Save</button>
      </form>
    </>
  );
};

export default RegisterForm;
