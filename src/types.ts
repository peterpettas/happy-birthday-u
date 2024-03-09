export interface Contact {
  id: string; // We'll generate a unique ID
  name: string;
  birthday: string; // Assuming a simple string date format for now
  platform: string; // 'SMS', 'Messenger', etc.
}