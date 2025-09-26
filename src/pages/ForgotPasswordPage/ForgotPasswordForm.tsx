import { zodResolver } from '@hookform/resolvers/zod';
import { useSnackbar } from 'notistack';
import { useForm, type SubmitHandler, } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { z } from 'zod';
import routes from '../../routes';
import { useForgotPassword } from '../../services/forgotPassword';

type Inputs = {
  emailAddress: string;
};

export function ForgotPasswordForm() {

  const ForgotPasswordSchema = z.object({
    emailAddress: z
      .email({ error: "Geçersiz e-posta adresi" })
      .min(1, { message: ('E-posta adresi gerekli') }),
  });

  type Values = z.infer<typeof ForgotPasswordSchema>;

  const defaultValues = {
    emailAddress: '',
  } satisfies Values;

  const methods = useForm<Values>({
    defaultValues,
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = methods;

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { isPending, mutateAsync } = useForgotPassword();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await mutateAsync({
      email: data.emailAddress,
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
      enqueueSnackbar("Parola sıfırlama talebiniz alındı. E-posta adresinizi kontrol edin.", {
        variant: 'success',
      });
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
      <div className={"form-control" + ' ' +(!!errors.emailAddress ? 'invalid' : '')}>
        <label htmlFor="email">E-mail*</label>
        <input type="email" id="email" {...register("emailAddress", { required: true })} />
        {errors.emailAddress && <span className='error'>{errors.emailAddress.message}</span>}
      </div>
      <div className="attention-text">
        <p>
          Attention Please
        </p>
        <span>
          Only avaliable for University Students
        </span>
      </div>

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