export type UserDto = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: string;
  organizationId: number | null;
  token: string;
  photo: string;
  isEmailConfirmed: boolean;
  isConfirmedStudent: boolean;

  organization: any; // TODO: ResellerDto
};