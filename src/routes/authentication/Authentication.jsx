import SignUpForm from "../../components/signupform/SignUpForm";
import SignInForm from "../../components/signinform/SigninForm";
import "./authentication.style.scss";

const Authentication = () => {
  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
