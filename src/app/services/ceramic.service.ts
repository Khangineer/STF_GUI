import { Injectable } from '@angular/core';
import { CeramicClient } from '@ceramicnetwork/http-client';
import { ComposeClient } from '@composedb/client';
import { DID } from 'dids';
import { Ed25519Provider } from 'key-did-provider-ed25519';
import { getResolver } from 'key-did-resolver';
import { randomBytes } from 'crypto';
import { definition } from '../../composites/definition.js';

@Injectable({
  providedIn: 'root'
})
export class CeramicService {
  private ceramic: CeramicClient;
  private compose: ComposeClient;
  private did: DID | null = null;

  constructor() {
    // Connect to the Ceramic testnet
    this.ceramic = new CeramicClient('https://ceramic-clay.3boxlabs.com');
    
    // Initialize ComposeDB client with our schema definition
    this.compose = new ComposeClient({
      ceramic: 'https://ceramic-clay.3boxlabs.com',
      definition
    });
  }

  async authenticate(ethereumAddress: string) {
    try {
      const seed = randomBytes(32);
      const provider = new Ed25519Provider(seed);
      const did = new DID({
        provider,
        resolver: getResolver(),
      });
      await did.authenticate();
      
      this.did = did;
      this.ceramic.did = did;
      this.compose.setDID(did);
      
      return true;
    } catch (error) {
      console.error('Authentication error:', error);
      return false;
    }
  }

  async createUser(userData: any) {
    try {
      if (!this.did) throw new Error('Not authenticated');

      const result = await this.compose.executeQuery(`
        mutation CreateUser($input: CreateUserInput!) {
          createUser(input: $input) {
            document {
              id
              walletAddress
              reputation
              createdAt
            }
          }
        }
      `, {
        input: {
          content: {
            walletAddress: userData.walletAddress,
            reputation: userData.reputation,
            createdAt: new Date().toISOString()
          }
        }
      });

      return result.data?.createUser?.document;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async getUser(walletAddress: string) {
    try {
      if (!this.did) throw new Error('Not authenticated');

      const result = await this.compose.executeQuery(`
        query GetUser($walletAddress: String!) {
          userIndex(first: 1, filters: { where: { walletAddress: { equalTo: $walletAddress } } }) {
            edges {
              node {
                id
                walletAddress
                reputation
                createdAt
              }
            }
          }
        }
      `, {
        walletAddress
      });

      return result.data?.userIndex?.edges[0]?.node;
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  }

  async updateUser(id: string, updates: any) {
    try {
      if (!this.did) throw new Error('Not authenticated');

      const result = await this.compose.executeQuery(`
        mutation UpdateUser($input: UpdateUserInput!) {
          updateUser(input: $input) {
            document {
              id
              walletAddress
              reputation
              createdAt
            }
          }
        }
      `, {
        input: {
          id,
          content: updates
        }
      });

      return result.data?.updateUser?.document;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  async addSpacecraft(spacecraft: any) {
    try {
      if (!this.did) throw new Error('Not authenticated');

      const result = await this.compose.executeQuery(`
        mutation CreateSpacecraft($input: CreateSpacecraftInput!) {
          createSpacecraft(input: $input) {
            document {
              id
              name
              model
              stats {
                speed
                cargo
                defense
              }
              createdAt
            }
          }
        }
      `, {
        input: {
          content: {
            name: spacecraft.name,
            model: spacecraft.model,
            stats: spacecraft.stats,
            createdAt: new Date().toISOString()
          }
        }
      });

      return result.data?.createSpacecraft?.document;
    } catch (error) {
      console.error('Error adding spacecraft:', error);
      throw error;
    }
  }

  async addResource(resource: any) {
    try {
      if (!this.did) throw new Error('Not authenticated');

      const result = await this.compose.executeQuery(`
        mutation CreateResource($input: CreateResourceInput!) {
          createResource(input: $input) {
            document {
              id
              name
              quantity
              U_RID
              createdAt
            }
          }
        }
      `, {
        input: {
          content: {
            name: resource.name,
            quantity: resource.quantity,
            U_RID: resource.U_RID,
            createdAt: new Date().toISOString()
          }
        }
      });

      return result.data?.createResource?.document;
    } catch (error) {
      console.error('Error adding resource:', error);
      throw error;
    }
  }

  async addPart(part: any) {
    try {
      if (!this.did) throw new Error('Not authenticated');

      const result = await this.compose.executeQuery(`
        mutation CreatePart($input: CreatePartInput!) {
          createPart(input: $input) {
            document {
              id
              name
              quantity
              createdAt
            }
          }
        }
      `, {
        input: {
          content: {
            name: part.name,
            quantity: part.quantity,
            id: part.id,
            createdAt: new Date().toISOString()
          }
        }
      });

      return result.data?.createPart?.document;
    } catch (error) {
      console.error('Error adding part:', error);
      throw error;
    }
  }
}
