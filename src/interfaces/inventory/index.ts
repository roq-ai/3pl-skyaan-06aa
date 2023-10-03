import { ShipmentInterface } from 'interfaces/shipment';
import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface InventoryInterface {
  id?: string;
  product_name: string;
  product_description?: string;
  quantity: number;
  company_id: string;
  received_date?: any;
  created_at?: any;
  updated_at?: any;
  shipment?: ShipmentInterface[];
  company?: CompanyInterface;
  _count?: {
    shipment?: number;
  };
}

export interface InventoryGetQueryInterface extends GetQueryInterface {
  id?: string;
  product_name?: string;
  product_description?: string;
  company_id?: string;
}
