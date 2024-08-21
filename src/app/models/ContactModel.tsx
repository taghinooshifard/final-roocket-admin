export default interface ContactModel {
  id?: number;
  name: string;
  email: string;
  content?: string;
  is_reviewed: boolean;
  created_at?: number;
}
