import { useMutation } from '@tanstack/react-query';
import type { ResetPasswordDto } from '../contracts/ResetPassword';
import { API_BASEURL, type ResponseModel } from './base';

type Request = {
  passwordResetToken: string;
  password: string;

};

async function resetPassword(request: Request): Promise<[ResponseModel<ResetPasswordDto>, Response]> {
  const response = await fetch(`${API_BASEURL}/api/resetPassword`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  });

  try {
    const result = await response.json();
    return [result as ResponseModel<ResetPasswordDto>, response];
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

export function useResetPassword() {
  return useMutation({
    mutationFn: (request: Request) => {
      return resetPassword(request);
    },
  })
}