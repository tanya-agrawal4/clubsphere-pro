
export enum ClubCategory {
  TECHNICAL = 'technical',
  BUSINESS = 'business',
  CULTURAL = 'cultural',
  CREATIVE = 'creative',
  LITERARY = 'literary',
  SOCIAL = 'social',
  SPORTS = 'sports'
}

export type UserRole = 'student' | 'admin';
export type ApplicationStatus = 'pending' | 'accepted' | 'rejected';

export interface Club {
  id: string;
  name: string;
  category: ClubCategory;
  shortDescription: string;
  longDescription: string;
  image: string;
  instagram: string;
  applyLink: string;
}

export interface User {
  enrollmentNo?: string;
  isLoggedIn: boolean;
  role: UserRole;
}

export interface Application {
  id: string;
  clubId: string;
  clubName: string;
  fullName: string;
  enrollmentNo: string;
  branch: string;
  sop: string;
  status: ApplicationStatus;
  timestamp: number;
  resumeName?: string;
}

export interface ClubSettings {
  isOpen: boolean;
  noticePdfName?: string;
  noticeTimestamp?: number;
}

export interface ClubStatusMap {
  [clubId: string]: ClubSettings;
}
