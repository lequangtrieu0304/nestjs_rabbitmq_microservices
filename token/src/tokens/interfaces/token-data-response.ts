export interface ITokenDataResponse {
  status: number;
  message: string;
  data: { userId: number } | null;
}
