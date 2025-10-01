import { zodResolver } from '@hookform/resolvers/zod';
import { useSnackbar } from 'notistack';
import { useMemo } from 'react';
import { useForm, type SubmitHandler, } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router';
import { z } from 'zod';
import { useAuth } from '../../contexts/AuthContext';
import routes from '../../routes';
import { useResetPassword } from '../../services/resetPassword';

type Inputs = {
  password: string;
};

export function ResetPasswordForm() {
  const [searchParams] = useSearchParams();

  const { signOut } = useAuth();

  const recoveryCode = useMemo(() => {
    if (!searchParams) {
      return null;
    }
    if (!searchParams.has('recoverycode')) {
      return null;
    }
    const passwordresettoken = searchParams.get('recoverycode');
    if (!passwordresettoken) {
      return null;
    }
    return passwordresettoken;
  },
    [searchParams]);

  const ResetPasswordSchema = z.object({
    password: z.string().min(1, { message: ('Yeni parola gerekli') }),
    repeatPassword: z.string(),
  }).superRefine((data, ctx) => {
    if (data.password !== data.repeatPassword) {
      ctx.addIssue({ code: 'custom', message: 'Parolalar eşleşmeli', path: ['repeatPassword'] });
    }
  })
    ;;

  type Values = z.infer<typeof ResetPasswordSchema>;

  const defaultValues = {
    password: '',
    repeatPassword: '',
  } satisfies Values;

  const methods = useForm<Values>({
    defaultValues,
    resolver: zodResolver(ResetPasswordSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { isPending, mutateAsync } = useResetPassword();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await mutateAsync({
      password: data.password,
      passwordResetToken: recoveryCode || '',
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
      enqueueSnackbar("Parola sıfırlama başarılı. Giriş sayfasına yönlendiriliyorsunuz.", {
        variant: 'success',
      });
      signOut();
      setTimeout(() => {
        navigate(routes.signIn.route());
      }, 1000);
    }
    else {
      enqueueSnackbar('Beklenmeyen bir hata oluştu!');
    }
  };

  return (

    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className={"form-control" + ' ' + (!!errors.password ? 'invalid' : '')}>
        <label htmlFor="email">Parola*</label>
        <input type="email" id="email" {...register("password", { required: true })} />
        {errors.password && <span className='error'>{errors.password.message}</span>}
      </div>
      <div className={"form-control" + ' ' + (!!errors.repeatPassword ? 'invalid' : '')}>
        <label htmlFor="email">Parola (Tekrar)*</label>
        <input type="email" id="email" {...register("repeatPassword", { required: true })} />
        {errors.repeatPassword && <span className='error'>{errors.repeatPassword.message}</span>}
      </div>
      {/* <div className="attention-text">
        <p>
          Attention Please
        </p>
        <span>
          Only avaliable for University Students
        </span>
      </div> */}

      <input type="submit" value="SUBMIT" className="btn-primary" disabled={isPending} />

      <div className="attention-text">
        <span>
          <a href={routes.signIn.route()}>Sign In</a>  |  <a href={routes.signUp.route()}>Sign Up</a>
        </span>
      </div>


      <a href={routes.home.route()} className="close-popup">
        <img src="./images/close-popup.png" alt="" />
      </a>
    </form>

  );
}