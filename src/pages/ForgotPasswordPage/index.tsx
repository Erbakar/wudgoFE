import { ForgotPasswordForm } from './ForgotPasswordForm';

export default function ForgotPasswordPage(){
  return(
    <>
      {/* <!--ACCOUNT SIGNUP START--> */}
      <div className="page-container account">
        <div className="page-container--inner">
          <div className="content">
            <h1>
              FORGOT PASSWORD WUDGO
            </h1>

            <ForgotPasswordForm />
          </div>
        </div>
      </div>
      {/* <!--ACCOUNT SIGNUP  END--> */}
    </>
  );
}