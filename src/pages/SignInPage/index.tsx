import { SignInForm } from './SignInForm';

export default function () {
  return (
    <>
      {/* <!--ACCOUNT SIGNUP START--> */}
      <div className="page-container account">
        <div className="page-container--inner">
          <div className="content">
            <h1>
              SIGN IN WUDGO
            </h1>

            <SignInForm />
          </div>
        </div>
      </div>
      {/* <!--ACCOUNT SIGNUP  END--> */}
    </>
  );
}