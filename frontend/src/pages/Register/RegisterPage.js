import React, { useEffect } from "react";
import classes from "./registerPage.module.css";
import Title from "../../components/Title/Title";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

export default function RegisterPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { user } = auth;
  const [params] = useSearchParams();
  const returnUrl = params.get("returnUrl");

  useEffect(() => {
    if (!user) return;
    returnUrl ? navigate(returnUrl) : navigate("/");
  }, [user]);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const sumbit = async (data) => {
    await auth.register(data);
  };

  return (
    <div className={classes.container}>
      <div className={classes.details}>
        <Title title="Register" />
        <form onSubmit={handleSubmit(sumbit)} noValidate>
          <Input
            type="text"
            label="Name"
            {...register("name", {
              required: true,
              minLength: 5,
            })}
            error={errors.name}
          />

          <Input
            type="email"
            label="Email"
            {...register("email", {
              required: true,
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,63}$/i,
                message: "Email Is Not Valid",
              },
            })}
            error={errors.email}
          />

          <Input
            type="password"
            label="Password"
            {...register("password", {
              required: true,
              minLength: 3,
            })}
            error={errors.password}
          />

          <Input
            type="password"
            label="Confirm Password"
            {...register("confirmPassword", {
              required: true,
              validate: (value) =>
                value !== getValues("password") ? "Passwords dont match" : true,
            })}
            error={errors.confirmPassword}
          />
          <Input
            type="text"
            label="Address"
            {...register("address", {
              required: true,
              minLength: 5,
            })}
            error={errors.address}
          />
          <Button type="sumbit" text="Register here" />
          <div className={classes.login}>
            Already a user? &nbsp;
            <Link to={`/login${returnUrl ? "?returnUrl=" + returnUrl : ""}`}>
              Please login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
