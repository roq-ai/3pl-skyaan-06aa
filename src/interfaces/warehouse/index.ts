import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface WarehouseInterface {
  id?: string;
  name: string;
  location: string;
  capacity: number;
  current_inventory: number;
  company_id: string;
  created_at?: any;
  updated_at?: any;

  company?: CompanyInterface;
  _count?: {};
}

export interface WarehouseGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  location?: string;
  company_id?: string;
}
