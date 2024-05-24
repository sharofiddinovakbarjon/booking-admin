import LoginForm from "@/components/FORM/LoginForm/LoginForm";
import React from "react";

const Login: React.FC = () => {
  return (
    <>
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LoginForm />
      </div>
    </>
  );
};

export default Login;
