import { ResetPasswordForm } from './ResetPasswordForm';


export default function ResetPasswordPage(){
  return(
    <>
      {/* <!--ACCOUNT SIGNUP START--> */}
      <div className="page-container account">
        <div className="page-container--inner">
          <div className="content">
            <h1>
              RESET PASSWORD WUDGO
            </h1>

            <ResetPasswordForm />
          </div>
        </div>
      </div>
      {/* <!--ACCOUNT SIGNUP  END--> */}
    </>
  );
}