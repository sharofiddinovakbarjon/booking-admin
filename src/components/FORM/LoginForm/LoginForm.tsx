import { useLogInAdminMutation } from "@/store/apiRTK";
import { setUserInfo } from "@/store/bookingSlice/bookingSlice";
import { useAppDispatch } from "@/store/hooks/hooks";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  // States
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [validatePhone, setValidatePhone] = useState(true);
  const [validatePassword, setValidatePassword] = useState(true);

  // -------------------------------------------

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // get Request function & result
  const [loginRequest, result] = useLogInAdminMutation();

  // -----------------------------------------

  // Submit Function
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (validatePhone && validatePassword) {
      try {
        await loginRequest({ phone_number: phone, password: password });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Fill the inputs");
    }
  };

  // ----------------------------------------------

  // Handle Input Change

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setPhone(value);
      setValidatePhone(value.length <= 4 ? false : true);
    } else if (name === "password") {
      setPassword(value);
      setValidatePassword(value.length <= 4 ? false : true);
    }
  };

  // ---------------------------------------

  useEffect(() => {
    if (result.isSuccess && !result.isLoading) {
      // Set to localstorage
      localStorage.setItem("token", result.data.token);

      // Set to store
      dispatch(
        setUserInfo({
          password: password,
          phone_number: phone,
          token: result.data.token,
        })
      );

      // navigate to home
      navigate("/");
    }

    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [result.data]);

  return (
    <>
      <form className="form">
        <h1 className="form-title">Авторизация</h1>
        <div
          className={
            validatePhone
              ? "valid input-box phone-box"
              : "not-valid input-box phone-box"
          }
        >
          <input
            type="tel"
            name="phone"
            id="phone"
            required
            autoComplete="off"
            value={phone}
            onChange={handleInputChange}
          />
          <label htmlFor="phone">Телефон</label>
        </div>
        <div
          className={
            validatePassword
              ? "valid input-box password-box"
              : "not-valid input-box password-box"
          }
        >
          <input
            type="password"
            name="password"
            id="password"
            required
            autoComplete="off"
            value={password}
            className={validatePassword ? "valid" : "not-valid"}
            onChange={handleInputChange}
          />
          <label htmlFor="password">Пароль</label>
        </div>
        <a className="forget_link" href="#">
          Забыли пароль?
        </a>
        <button className="formButton" onClick={handleSubmit}>
          Далее
        </button>
      </form>
    </>
  );
};

export default LoginForm;
