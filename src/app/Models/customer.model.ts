// src/app/models/customer.model.ts
export interface Customer {
  id?: number;
  firstName: string;
  lastName: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  phone?: string;
  email: string;
  userName?: string;
  password?: string;
}
