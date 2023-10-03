import { InventoryInterface } from 'interfaces/inventory';
import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface ShipmentInterface {
  id?: string;
  shipment_status: string;
  dispatch_date?: any;
  arrival_date?: any;
  inventory_id: string;
  company_id: string;
  created_at?: any;
  updated_at?: any;

  inventory?: InventoryInterface;
  company?: CompanyInterface;
  _count?: {};
}

export interface ShipmentGetQueryInterface extends GetQueryInterface {
  id?: string;
  shipment_status?: string;
  inventory_id?: string;
  company_id?: string;
}
