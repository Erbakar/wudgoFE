import { useMutation } from '@tanstack/react-query';
import type { UserDto } from '../contracts/UserDto';
import { API_BASEURL, type ResponseModel } from './base';

type Request = {
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string,
  photo?: string,
  invitationCode?: string,
  // TODO
  // birthDate: string,
  // gender?:string,
};

async function createUser(request: Request): Promise<[ResponseModel<UserDto>, Response]> {
  const response = await fetch(`${API_BASEURL}/api/users`, {
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

export function useCreateUser() {
  return useMutation({
    mutationFn: (request: Request) => {
      return createUser(request);
    },
  })
}


/*
{
  "errors": {
    "Email": [
      "'Email' is not a valid email address."
    ]
  },
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "traceId": "00-1b42635658980b3340189737cb7491fd-de8b44f03ea09ddf-00"
}
 */


// {
//   "statusCode": 400,
//   "statusDescription": "BadRequest",
//   "isSuccessful": false,
//   "errors": [
//     "Sistemsel bir hata oluştu: None of the specified endpoints were reachable"
//   ]
// }

/*
{
  "statusCode": 400,
  "statusDescription": "BadRequest",
  "isSuccessful": false,
  "errors": [
    "'Email' is not a valid email address."
  ]
}
*/