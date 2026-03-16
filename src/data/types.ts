export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface Company {
  id: string;
  name: string;
  dba: string;
  logo?: string;
  entityType: string;
  status: "Active" | "Inactive" | "Dissolved";
  stateOfFormation: string;
  registrationDate: string;
  owner: string;
  registeredAgent: string;
  email: string;
  address: Address;
  industry: string;
  ein: string;
  annualRevenue: string;
  employees: number | string;
  website: string;
  description: string;
  lastUpdated?: string;
}
