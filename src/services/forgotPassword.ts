import { useMutation } from '@tanstack/react-query';
import type { ForgotPasswordDto } from '../contracts/ForgotPassword';
import { API_BASEURL, type ResponseModel } from './base';

type Request = {
  email: string,
};

async function forgotPassword(request: Request): Promise<[ResponseModel<ForgotPasswordDto>, Response]> {
  const response = await fetch(`${API_BASEURL}/api/forgotPassword`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  });

  try {
    const result = await response.json();
    return [result as ResponseModel<ForgotPasswordDto>, response];
  }
  catch {
    return [{
      isSuccessful: false,
      hasError:true,
      errors: [
        "Unexpected error"
      ]
    }, response];
  }
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (request: Request) => {
      return forgotPassword(request);
    },
  })
}