import { useMutation } from '@tanstack/react-query';
import type { UserDto } from '../contracts/UserDto';
import { API_BASEURL, type ResponseModel } from './base';

type Request = {
  emailConfirmationToken:string;
};

async function activateAccount(request: Request): Promise<[ResponseModel<UserDto>, Response]> {
  const response = await fetch(`${API_BASEURL}/api/activateAccount`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  });

  try {
    const result = await response.json();
    return [result as ResponseModel<UserDto>, response];
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

export function useActivateAccount () {
  return useMutation({
    mutationFn: (request: Request) => {
      return activateAccount(request);
    },
  })
}