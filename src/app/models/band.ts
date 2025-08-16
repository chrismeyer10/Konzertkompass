/** Repräsentiert eine Musikband. */
export interface Band {
  id: string;
  name: string;
  upcomingEvents?: string[];
  imageUrl?: string;
}
