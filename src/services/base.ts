export const API_BASEURL = `http://localhost:5000`;

export type ResponseModel<T> = {
  isSuccessful: false;
  errors: string[];
  hasError?: true;
} | {
  isSuccessful: true;
  data: T;
  totalRowCount?: number;
}