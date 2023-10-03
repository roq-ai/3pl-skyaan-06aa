const mapping: Record<string, string> = {
  clients: 'client',
  companies: 'company',
  inventories: 'inventory',
  shipments: 'shipment',
  users: 'user',
  warehouses: 'warehouse',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
