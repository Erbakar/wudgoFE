import { useSnackbar } from 'notistack';
import { useEffect, useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { useActivateAccount } from '../../services/activateAccount';
import routes from '../../routes';

export default function EmailConfirmation() {
  const [searchParams] = useSearchParams();

  const activateCode = useMemo(() => {
    if (!searchParams) {
      return null;
    }
    if (!searchParams.has('activatecode')) {
      return null;
    }
    const activatecode = searchParams.get('activatecode');
    if (!activatecode) {
      return null;
    }
    return activatecode;
  },
    [searchParams]);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { isPending, mutateAsync, data } = useActivateAccount();

  const activate = async (code: string) => {
    const response = await mutateAsync({
      emailConfirmationToken: code
    });

    if (!response[0].isSuccessful) {
      response[0].errors.forEach(x => {
        // enqueueSnackbar(x, {
        //   variant: 'error',
        // });
        console.log('Error: ', x);
      });
    }
    else if (!!response[0].isSuccessful) {
      if (!!response[0].data.token) {

        // TODO
        // local storage / cookie ile token'ı sakla
      }
      enqueueSnackbar("E-posta doğrulandı, hesabınıza giriş yapabilirsiniz.", {
        variant: 'success',
      });
      navigate(routes.signIn.route());
    }
    else {
      enqueueSnackbar('Beklenmeyen bir hata oluştu!');
    }
  };

  useEffect(() => {
    if (!!activateCode) {
      activate(activateCode);
    }
  }, [activateCode]);

  const response = data?.[0];

  return (
    <>
      <div className="page-container account">
        <div className="page-container--inner">
          <div className="content">
            <h1>
              ACTIVATE YOUR BODDOP ACCOUNT
            </h1>
            {!activateCode && (
              <>
                <p>
                  Geçersiz aktivasyon kodu. Lütfen e-posta adresinizi kontrol ediniz.
                </p>

                {/* TODO */}
                {/* e-posta alarak tekrar aktivasyon tetikle */}
              </>
            )}
            {isPending && (<>
              <p>
                E-posta kodunuz kontrol ediliyor.
              </p>
            </>)}
            {!isPending && !!response?.isSuccessful && (<>
              <p>
                E-posta doğrulandı, hesabınıza giriş yapabilirsiniz.
              </p>

              <Link className='btn-primary' to={routes.signIn.route()}>GİRİŞ YAP
              </Link>
            </>)}


            {!isPending && !!response && !response?.isSuccessful && (<>
              {response?.errors.includes("Email already confirmed") && (<>

                <p>
                  E-posta adresiniz zaten doğrulanmış.
                </p>
              </>)}

              {response?.errors.includes("User not found") && (<>

                <p>
                  E-posta doğrulama kodu hatalı.
                </p>
              </>)}

              {!response?.errors.includes("User not found") && !response?.errors.includes("Email already confirmed") && (<>
                <p>
                  E-posta doğrulanamadı.
                </p>

                <button className='btn-primary' onClick={() => activateCode && activate(activateCode)} >TEKRAR DENE
                </button>
              </>)}
            </>)}
          </div>
        </div>
      </div>
    </>
  );
}