import queryString from 'query-string';
import { ClientInterface, ClientGetQueryInterface } from 'interfaces/client';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getClients = async (query?: ClientGetQueryInterface): Promise<PaginatedInterface<ClientInterface>> => {
  return fetcher('/api/clients', {}, query);
};

export const createClient = async (client: ClientInterface) => {
  return fetcher('/api/clients', { method: 'POST', body: JSON.stringify(client) });
};

export const updateClientById = async (id: string, client: ClientInterface) => {
  return fetcher(`/api/clients/${id}`, { method: 'PUT', body: JSON.stringify(client) });
};

export const getClientById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/clients/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteClientById = async (id: string) => {
  return fetcher(`/api/clients/${id}`, { method: 'DELETE' });
};
