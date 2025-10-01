// SignInForm.tsx code:

import { zodResolver } from '@hookform/resolvers/zod';
import { useSnackbar } from 'notistack';
import { useForm, type SubmitHandler, } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { z } from 'zod';
import { useAuth } from '../../contexts/AuthContext';
import routes from '../../routes';
import { useAuthenticate } from '../../services/authenticate';

type Inputs = {
  emailAddress: string;
  password: string;
};

export function SignInForm() {

  const CompanyDetailSchema = z.object({
    emailAddress: z
      // .email({ error: "Geçersiz e-posta adresi" })
      .email({ error: "Invalid e-mail address" })
      .min(1, { message: ('E-mail required') }),
    password: z.string().min(1, ('Password required')),
  });

  type Values = z.infer<typeof CompanyDetailSchema>;

  const defaultValues = {
    emailAddress: '',
    password: '',
  } satisfies Values;

  const methods = useForm<Values>({
    defaultValues,
    resolver: zodResolver(CompanyDetailSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { isPending, mutateAsync } = useAuthenticate();

  const { signIn } = useAuth();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await mutateAsync({
      email: data.emailAddress,
      password: data.password,
    });

    if (!response[0].isSuccessful) {
      response[0].errors.forEach(x => {
        enqueueSnackbar(x, {
          variant: 'error',
        });
        console.log('Error: ', x);
      });
    }
    else if (!!response[0].isSuccessful) {
      signIn(response[0].data);
      enqueueSnackbar("Giriş yapıldı. Ana Sayfa'ya yönlendiriliyorsunuz.", {
        variant: 'success',
      });
      setTimeout(() => {
        navigate(routes.home.route());
      }, 1000);
    }
    else {
      enqueueSnackbar('Beklenmeyen bir hata oluştu!');
    }
  };

  return (

    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className={"form-control" + ' ' +(!!errors.emailAddress ? 'invalid' : '')}>
        <label htmlFor="email">Email*</label>
        <input type="email" id="email" {...register("emailAddress", { required: true })} />
        {errors.emailAddress && <span className='error'>{errors.emailAddress.message}</span>}
      </div>

      <div className={"form-control" + ' ' +(!!errors.password ? 'invalid' : '')}>
        <label htmlFor="password">Password*</label>
        <input type="password" id="password"  {...register("password", { required: true })} />
        {errors.password && <span className='error'>{errors.password.message}</span>}
      </div>
      <div className="attention-text">
        <p>
          Attention Please
        </p>
        <span>
          Only avaliable for University Students
        </span>
      </div>

      <input type="submit" value="SIGN IN" className="btn-primary" disabled={isPending} />

      <div className="attention-text">
        <span>
          <a href={routes.forgotPassword.route()}>Forgot Password</a>  |  <a href={routes.signUp.route()}>Sign Up</a>
        </span>
      </div>


      <a href={routes.home.route()} className="close-popup">
        <img src="./images/close-popup.png" alt="" />
      </a>
    </form>

  );
}