import { useLogInAdminMutation } from "@/store/apiRTK";
import { setUserInfo } from "@/store/bookingSlice/bookingSlice";
import { useAppDispatch } from "@/store/hooks/hooks";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  // States
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

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

    try {
      await loginRequest({ phone_number: phone, password: password });
    } catch (error) {
      console.log(error);
    }
  };

  // ----------------------------------------------

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
        <h1 className="form-title">Log in</h1>
        <div className="phone-input input-box">
          <label htmlFor="phone">Phone *</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            placeholder="yout phone number..."
            required
            autoComplete="off"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="password-input input-box">
          <label htmlFor="password">Password *</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="your password..."
            required
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <a className="forget_link" href="#">
          Forgot password?
        </a>
        <button className="formButton" onClick={handleSubmit}>
          Log in
        </button>
      </form>
    </>
  );
};

export default LoginForm;
