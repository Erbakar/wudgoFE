import { Route, Routes } from 'react-router';
import DefaultLayout from './layouts/DefaultLayout';
import { NavigationContextProvider } from './contexts/NavigationContext';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import routes from './routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import EmailConfirmation from './pages/EmailConfirmationPage';
import SignInPage from './pages/SignInPage';
import { AuthContextProvider } from './contexts/AuthContext';
import FaqPage from './pages/FaqPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfUsePage from './pages/TermsOfUsePage';
import SitemapPage from './pages/SitemapPage';
import GuestLayout from './layouts/GuestLayout';

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route element={<GuestLayout />}>
          <Route path={routes.signUp.routeFormat} element={<SignUpPage />} />
          <Route path={routes.signIn.routeFormat} element={<SignInPage />} />
          <Route path={routes.forgotPassword.routeFormat} element={<ForgotPasswordPage />} />
          <Route path={routes.emailConfirmation.routeFormat} element={<EmailConfirmation />} />
        </Route>

        <Route element={<DefaultLayout />}>
          <Route index element={<HomePage />} />


          {/* static pages */}
          <Route path={routes.faq.routeFormat} element={<FaqPage />} />
          <Route path={routes.privacyPolicy.routeFormat} element={<PrivacyPolicyPage />} />
          <Route path={routes.termsOfUse.routeFormat} element={<TermsOfUsePage />} />
          <Route path={routes.siteMap.routeFormat} element={<SitemapPage />} />
        </Route>
      </Routes>
    </>
  );
}

// Create a client
const queryClient = new QueryClient();

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <NavigationContextProvider>
            <SnackbarProvider className="snackbar" dense maxSnack={3} autoHideDuration={1000} preventDuplicate anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <AppRoutes />
            </SnackbarProvider>
          </NavigationContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
