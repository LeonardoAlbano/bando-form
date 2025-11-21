// Data Transfer Objects and domain types for the Application entity

export type ApplicationFit = "YES" | "NO";

export interface CreateApplicationDTO {
  name: string;
  whatsapp: string;
  mainChallenge: string;
  reactionToBlock: string;
  controlLevel: number;
  finalFit: ApplicationFit;
  notJoinReason?: string | null;
}

export interface Application extends CreateApplicationDTO {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
