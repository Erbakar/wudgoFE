import { zodResolver } from '@hookform/resolvers/zod';
import { useSnackbar } from 'notistack';
import { useMemo } from 'react';
import { useForm, type SubmitHandler, } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { z } from 'zod';
import routes from '../../routes';
import { useCreateUser } from '../../services/createUser';

// TODO
type Inputs = {
  emailAddress: string;
  firstName: string;
  lastName: string;
  password: string;
  repeatPassword: string;
  photo?: string;
  termsOfUseAndPrivacyPolicyAccepted: boolean;
  isUniversityStudent: boolean;
  gender?: string;
  birthDate: string;
};

export function SignUpForm() {

  const [searchParams] = useSearchParams();


  const invitationCode = useMemo(() => {
    if (!searchParams) {
      return null;
    }
    if (!searchParams.has('invitationCode')) {
      return null;
    }
    const invitationcode = searchParams.get('invitationCode');
    if (!invitationcode) {
      return null;
    }
    return invitationcode;
  },
    [searchParams]);

  const CompanyDetailSchema = z.object({
    emailAddress: z
      .email({ error: "Geçersiz e-posta adresi" })
      .min(1, { message: ('E-posta adresi gerekli') }),
    firstName: z.string().min(1, ('Ad gerekli')).max(200, 'En fazla 200 karakter girilebilir'),
    lastName: z.string().min(1, ('Soyadı gerekli')),
    gender: z.string().min(1, ('Cinsiyet gerekli')),
    birthDate: z.string().min(1, 'Doğum tarihi gerekli'),
    password: z.string().min(8, ('Parola en az 8 karakterden oluşmalı')),
    termsOfUseAndPrivacyPolicyAccepted: z.boolean().refine(val => val === true, { message: 'Kullanım Koşulları ve Gizlilik Politikasını kabul etmelisiniz' }),
    isUniversityStudent: z.boolean().refine(val => val === true, { message: 'Hizmetlerimizi yalnızca üniversite öğrencileri kullanabilir' }),
    repeatPassword: z.string(),
    photo: z.string().optional(),
  })
    .superRefine((data, ctx) => {
      if (data.password !== data.repeatPassword) {
        ctx.addIssue({ code: 'custom', message: 'Parolalar eşleşmeli', path: ['repeatPassword'] });
      }
    })
    ;
  ;

  type Values = z.infer<typeof CompanyDetailSchema>;

  const defaultValues = {
    emailAddress: '',
    firstName: '',
    lastName: '',
    password: '',
    repeatPassword: '',
    photo: '',
    gender: 'Erkek',
    birthDate: '01.01.2005',
    termsOfUseAndPrivacyPolicyAccepted: false,
    isUniversityStudent:false,
  } satisfies Values;

  const methods = useForm<Values>({
    defaultValues,
    resolver: zodResolver(CompanyDetailSchema),
  });

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = methods;

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { isPending, mutateAsync } = useCreateUser();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await mutateAsync({
      email: data.emailAddress,
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.emailAddress,
      password: data.password,
      photo: '',
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
      enqueueSnackbar("Kullanıcı oluşturuldu, lütfen giriş yapınız...", {
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
      <div className="form-control">
        <label htmlFor="email">Email*</label>
        <input type="email" id="email" {...register("emailAddress", { required: true })} />
        {errors.emailAddress && <span className='error'>{errors.emailAddress.message}</span>}
      </div>

      <div className="row-item">
        <div className="form-control">
          <label htmlFor="name">Name*</label>
          <input type="text" id="name" {...register("firstName", { required: true })} />
          {errors.firstName && <span className='error'>{errors.firstName.message}</span>}
        </div>

        <div className="form-control">
          <label htmlFor="lastname">Last Name*</label>
          <input type="text" id="lastname"  {...register("lastName", { required: true })} />
          {errors.lastName && <span className='error'>{errors.lastName.message}</span>}
        </div>
      </div>

      <div className="row-item">
        <div className="form-control">
          <label htmlFor="password">Password*</label>
          <input type="password" id="password"  {...register("password", { required: true })} />
          {errors.password && <span className='error'>{errors.password.message}</span>}
          <span className="error silent">
            The password must contain numbers and uppercase, lowercase letters.
          </span>
        </div>

        <div className="form-control">
          <label htmlFor="password-repeat">Repeat Password*</label>
          <input type="password" id="password-repeat"  {...register("repeatPassword", { required: true })} />
          {errors.repeatPassword && <span className='error'>{errors.repeatPassword.message}</span>}
        </div>

      </div>


      <div className="row-item">
        <div className="form-control">
          <div className="hero-datepicker" >
            <div className="datepicker">
              <span>
                Birth Date
              </span>
              {/* TODO: Remove this with an actual date picker */}
              {/* <input type="date" value={minD} onChange={(e) => setMinD(e.target.value)} /> */}
              <button>
                <img src="./images/calendar-icon.png" alt="" />
              </button>
            </div>
          </div>
        </div>

        <div className="form-control">
          <label htmlFor="gender">Cinsiyet*</label>
          <input type="text" id="gender"  {...register("gender", { required: true })} />
          {errors.gender && <span className='error'>{errors.gender.message}</span>}
        </div>
      </div>

      <div className="row-item">
        <label className="container">
          <span className="title">
            I am a university student
          </span>
          <input type="checkbox" />
          <span className="checkmark"></span>
        </label>
        <label className="container">
          <span className="title">
            I agree with the <a href={routes.termsOfUse.route()}>Terms of use </a>
            and <a href={routes.privacyPolicy.route()}>Privacy policy</a>
          </span>
          <input type="checkbox" {...register("termsOfUseAndPrivacyPolicyAccepted")} />
          <span className="checkmark"></span>
        </label>
      </div>

      <div className="attention-text">
        <p>
          Attention Please
        </p>
        <span>
          Only avaliable for University Students
        </span>
      </div>


      {/* {data?.[0] && !data[0].isSuccessful && (
        <>
          {
            data[0].errors.map(x => (
              <span className="error">
                {x}
              </span>
            ))
          }
        </>
      )} */}

      <input type="submit" value="REGISTER" className="btn-primary" disabled={isPending} />

      <div className="attention-text">
        <span>
          If you have an account,<Link to={routes.signIn.route()}>Sign In from here. </Link>
        </span>
      </div>


      <a href={routes.home.route()} className="close-popup">
        <img src="./images/close-popup.png" alt="" />
      </a>
    </form>
  );
}