import { SignUpForm } from './SignUpForm';

export default function () {
  return (
    <>
      {/* <!--ACCOUNT SIGNUP START--> */}
      <div className="page-container account">
        <div className="page-container--inner">
          <div className="content">
            <h1>
              REGISTER BODDOP
            </h1>

            <SignUpForm />
          </div>
        </div>
      </div>
      {/* <!--ACCOUNT SIGNUP  END--> */}
    </>
  );
}