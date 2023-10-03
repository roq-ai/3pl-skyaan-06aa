interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: ['Customer'],
  tenantRoles: ['Business Owner', 'Warehouse Manager', 'Client'],
  tenantName: 'Company',
  applicationName: '3PL SKYAAN',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: ['Read user information', 'Read company information', 'Read inventory', 'Read shipment status'],
  ownerAbilities: [
    'Manage company information',
    'Manage inventory',
    'Manage shipments',
    'Manage client information',
    'Manage warehouse',
  ],
  getQuoteUrl: 'https://app.roq.ai/proposal/58b1e8b8-30f1-4563-aabc-5deac7420e92',
};
