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
  // gender?: string;
  // birthDate: string;
};

export function SignUpForm() {

  const [searchParams] = useSearchParams();

  // TODO
  // const defaultBirthDate = format(subYears(new Date(), 18), 'yyyy-MM-dd');

  // const [birthDateRawValue, setBirthDateRawValue] = useState(defaultBirthDate);
  // const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  // const formattedBirthDate = useMemo(() => {
  //   return birthDateRawValue ? format(new Date(birthDateRawValue), 'dd/MM/yyyy', { locale: tr }) : 'Doğum tarihi seçin';
  // }, [birthDateRawValue]);



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

  const SignUpSchema = z.object({
    emailAddress: z
      //   .email({ error: "Geçersiz e-posta adresi" })
      //   .min(1, { message: ('E-posta adresi gerekli') }),
      // firstName: z.string().min(1, ('Ad gerekli')).max(200, 'En fazla 200 karakter girilebilir'),
      // lastName: z.string().min(1, ('Soyadı gerekli')).max(200, 'En fazla 200 karakter girilebilir'),
      // // TODO
      // // gender: z.string().min(1, ('Cinsiyet gerekli')).max(200, 'En fazla 200 karakter girilebilir'),
      // // birthDate: z.string().min(1, 'Doğum tarihi gerekli').max(200, 'En fazla 200 karakter girilebilir').refine((dateString) => {
      // //   const date = new Date(dateString);
      // //   return !isNaN(date.getTime()) && date.getTime() < new Date().getTime();
      // // }, { message: 'Geçerli bir doğum tarihi seçmelisiniz' }),
      // password: z.string().min(8, ('Parola en az 8 karakterden oluşmalı')).max(200, 'En fazla 50 karakter girilebilir'),
      // termsOfUseAndPrivacyPolicyAccepted: z.boolean().refine(val => val === true, { message: 'Kullanım Koşulları ve Gizlilik Politikasını kabul etmelisiniz' }),
      // isUniversityStudent: z.boolean().refine(val => val === true, { message: 'Hizmetlerimizi yalnızca üniversite öğrencileri kullanabilir' }),
      .email({ error: "Invalid e-mail address" })
      .min(1, { message: ('E-mail address required') }),
    firstName: z.string().min(1, ('Firstname required')).max(200, 'Maximum of 200 characters allowed'),
    lastName: z.string().min(1, ('Lastname required')).max(200, 'Maximum of 200 characters allowed'),
    // TODO
    // gender: z.string().min(1, ('Cinsiyet gerekli')).max(200, 'En fazla 200 karakter girilebilir'),
    // birthDate: z.string().min(1, 'Doğum tarihi gerekli').max(200, 'En fazla 200 karakter girilebilir').refine((dateString) => {
    //   const date = new Date(dateString);
    //   return !isNaN(date.getTime()) && date.getTime() < new Date().getTime();
    // }, { message: 'Geçerli bir doğum tarihi seçmelisiniz' }),
    // password: z.string().min(8, ('Password must be at least 8 characters long')).max(200, 'Maximum of 200 characters allowed'),
    password: z.string()
      .min(8, ('Password must be at least 8 characters long'))
      .max(200, 'Maximum of 200 characters allowed')
      // Regex explanation:
      // (?=.*[a-z]) : Must contain at least one lowercase letter
      // (?=.*[A-Z]) : Must contain at least one uppercase letter
      // (?=.*\d)    : Must contain at least one digit (number)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        { message: 'Password must include uppercase, lowercase, and numbers.' }
      ),
    termsOfUseAndPrivacyPolicyAccepted: z.boolean().refine(val => val === true, { message: 'You must accept the Terms of Use and Privacy Policy' }),
    isUniversityStudent: z.boolean().refine(val => val === true, { message: 'Only university students can use our services.' }),
    repeatPassword: z.string(),
    photo: z.string().optional(),
  })
    .superRefine((data, ctx) => {
      if (data.password !== data.repeatPassword) {
        // ctx.addIssue({ code: 'custom', message: 'Parolalar eşleşmeli', path: ['repeatPassword'] });
        ctx.addIssue({ code: 'custom', message: 'Passwords must match', path: ['repeatPassword'] });
      }
    })
    ;
  ;

  type Values = z.infer<typeof SignUpSchema>;

  const defaultValues = {
    emailAddress: '',
    firstName: '',
    lastName: '',
    password: '',
    repeatPassword: '',
    photo: '',
    // TODO
    // gender: allGendersTypeText(GenderTypes.Unknown),
    // birthDate: defaultBirthDate,
    termsOfUseAndPrivacyPolicyAccepted: false,
    isUniversityStudent: false,
  } satisfies Values;

  // });
  const methods = useForm<Values>({
    defaultValues,
    resolver: zodResolver(SignUpSchema),
  });


  const {
    register,
    handleSubmit,
    // setValue,
    formState: { errors },
  } = methods;

  // TODO
  // const handleBirthDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const newDate = event.target.value;
  //   setBirthDateRawValue(newDate);
  //   setValue('birthDate', newDate, { shouldValidate: true });
  //   setIsDatePickerOpen(false);
  // };

  // TODO
  // const openDatePicker = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   setIsDatePickerOpen(true);
  //   document.getElementById('birthDateInput')?.focus();
  //   document.getElementById('birthDateInput')?.click();
  // };


  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { isPending, mutateAsync } = useCreateUser();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    const response = await mutateAsync({
      email: data.emailAddress,
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.emailAddress,
      password: data.password,
      photo: '',
      invitationCode: invitationCode || undefined,
      // TODO
      // birthDate: data.birthDate,
      // gender: data.gender || '',
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
      <div className={"form-control" + ' ' + (!!errors.emailAddress ? 'invalid' : '')}>
        <label htmlFor="email">Email*</label>
        <input type="email" id="email" {...register("emailAddress", { required: true })} />
        {errors.emailAddress && <span className='error'>{errors.emailAddress.message}</span>}
      </div>

      <div className="row-item">
        <div className={"form-control" + ' ' + (!!errors.firstName ? 'invalid' : '')}>
          <label htmlFor="name">Name*</label>
          <input type="text" id="name" {...register("firstName", { required: true })} />
          {errors.firstName && <span className='error'>{errors.firstName.message}</span>}
        </div>

        <div className={"form-control" + ' ' + (!!errors.lastName ? 'invalid' : '')}>
          <label htmlFor="lastname">Last Name*</label>
          <input type="text" id="lastname"  {...register("lastName", { required: true })} />
          {errors.lastName && <span className='error'>{errors.lastName.message}</span>}
        </div>
      </div>

      <div className="row-item">
        <div className={"form-control" + ' ' + (!!errors.password ? 'invalid' : '')}>
          <label htmlFor="password">Password*</label>
          <input type="password" id="password"  {...register("password", { required: true })} />
          {errors.password && <span className='error'>{errors.password.message}</span>}
          <span className="error silent">
            The password must contain numbers and uppercase, lowercase letters.
          </span>
        </div>

        <div className={"form-control" + ' ' + (!!errors.repeatPassword ? 'invalid' : '')}>
          <label htmlFor="password-repeat">Repeat Password*</label>
          <input type="password" id="password-repeat"  {...register("repeatPassword", { required: true })} />
          {errors.repeatPassword && <span className='error'>{errors.repeatPassword.message}</span>}
        </div>

      </div>
      {/* TODO */}
      {/* <div className="row-item">
        <div className="form-control"
          style={{ width: '100%', height: '100%' }}
        >
          <label htmlFor="birthDateInput">Birth Date*</label>
          <div className="selected-dates"
            style={{ width: '100%', height: '63px', display: 'flex', justifyContent: 'start' }}
          >
            <div
              style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              className="datepicker">
              <div
                style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <p
                  style={{ width: '100%', textAlign: 'center' }}
                >
                  {formattedBirthDate}
                </p>
                <input
                  id="birthDateInput"
                  type="date"
                  {...register("birthDate")}
                  onChange={handleBirthDateChange}
                  max={defaultBirthDate}
                  style={{
                    position: 'absolute',
                    opacity: 0,
                    width: '1px',
                    height: '1px',
                    padding: 0,
                    border: 'none',
                    pointerEvents: 'none'
                  }}
                />
              </div>
              <button
                type="button"
                onClick={openDatePicker}
              >
                <img src="./images/calendar-icon.png" alt="" />
              </button>
            </div>
          </div>
          {errors.birthDate && <span className='error'>{errors.birthDate.message}</span>}
        </div>

        <div className="form-control">
          <label htmlFor="gender">Cinsiyet*</label>
          <input type="text" id="gender"  {...register("gender", { required: true })} />
          {errors.gender && <span className='error'>{errors.gender.message}</span>}
        </div>
      </div> */}

      <div className="row-item">
        <label className="container">
          <span className="title"
            style={{ color: errors.isUniversityStudent?.message ? '#ff4622' : '' }}
          >
            I am a university student
          </span>
          <input type="checkbox" {...register("isUniversityStudent")} />
          <span className="checkmark"></span>
          {errors.isUniversityStudent && <p className='error'>{errors.isUniversityStudent.message}</p>}
        </label>

        <label className="container">
          <span className="title"
            style={{ color: errors.termsOfUseAndPrivacyPolicyAccepted?.message ? '#ff4622' : '' }}
          >
            I agree with the <a href={routes.termsOfUse.route()}>Terms of use </a>
            and <a href={routes.privacyPolicy.route()}>Privacy policy</a>
          </span>
          <input type="checkbox" {...register("termsOfUseAndPrivacyPolicyAccepted")} />
          <span className="checkmark"></span>
          {errors.isUniversityStudent && <p className='error'>{errors.termsOfUseAndPrivacyPolicyAccepted?.message}</p>}
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