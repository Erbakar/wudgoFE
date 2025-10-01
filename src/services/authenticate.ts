// authenticate.ts code:
import { useMutation } from '@tanstack/react-query';
import type { UserDto } from '../contracts/UserDto';
import { API_BASEURL, type ResponseModel } from './base';


type Request = {
  email: string,
  password: string,
};

async function authenticate(request: Request): Promise<[ResponseModel<UserDto>, Response]> {
  const response = await fetch(`${API_BASEURL}/api/authenticate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  });

  try {
    const result = await response.json() as ResponseModel<UserDto>;

    return [result, response];
  }
  catch {
    return [{
      isSuccessful: false,
      hasError: true,
      errors: [
        "Unexpected error"
      ]
    }, response];
  }
}

export function useAuthenticate() {
  return useMutation({
    mutationFn: (request: Request) => {
      return authenticate(request);
    },
  })
}