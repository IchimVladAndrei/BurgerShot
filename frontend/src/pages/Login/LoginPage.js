import React, { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import classes from "./loginPage.module.css";
import Title from "../../components/Title/Title";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
export default function LoginPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [params] = useSearchParams();
  const returnUrl = params.get("returnUrl");

  useEffect(() => {
    if (!user) return;
    returnUrl ? navigate(returnUrl) : navigate("/");
  }, [navigate, returnUrl, user]);

  const sumbit = async ({ email, password }) => {
    await login(email, password);
  };
  //onSubmit={handleSubmit(submit)} noValidate
  return (
    <div className={classes.container}>
      <div className={classes.details}>
        <Title title="Login" />

        <form onSubmit={handleSubmit(sumbit)} noValidate>
          <Input
            type="email"
            label="Email"
            {...register("email", {
              required: true,
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,63}$/i,
                message: "Email not valid",
              },
            })}
            error={errors.email}
          />

          <Input
            type="password"
            label="Password"
            {...register("password", {
              required: true,
            })}
            error={errors.password}
          />
          <Button type="sumbit" text="Login" />
          <div className={classes.register}>
            New user? &nbsp;
            <Link to={`/register${returnUrl ? "?returnUrl=" : ""}`}>
              Please register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
