export default interface ProfileModel {
  id?: number;
  name: string;
  email: string;
  password?: string;
  password_confirmation?: string;
}
