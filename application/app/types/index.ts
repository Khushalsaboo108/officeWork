export interface authData {
  auth: boolean;
  status: number | null;
  message: string;
  loading: boolean;
  error: string | null;
  tocken : string;
}

export interface loginValue {
  username: string;
  password: string;
}

export interface body {
  userName: string;
  password: string;
}
