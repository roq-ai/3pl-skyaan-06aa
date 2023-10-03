import { ClientInterface } from 'interfaces/client';
import { InventoryInterface } from 'interfaces/inventory';
import { ShipmentInterface } from 'interfaces/shipment';
import { WarehouseInterface } from 'interfaces/warehouse';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CompanyInterface {
  id?: string;
  description?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  client?: ClientInterface[];
  inventory?: InventoryInterface[];
  shipment?: ShipmentInterface[];
  warehouse?: WarehouseInterface[];
  user?: UserInterface;
  _count?: {
    client?: number;
    inventory?: number;
    shipment?: number;
    warehouse?: number;
  };
}

export interface CompanyGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
