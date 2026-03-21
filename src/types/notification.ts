export interface NotificationItem {
  dangerLevel: number;
  issuedAt: string;
  message: string;
  notificationId: number;
  targetRegions: string;
  title: string;
  type: string;
}

export interface NotificationsResponse {
  dangerLevel: number | null;
  data: {
    currentSearchRegion: string;
    notifications: NotificationItem[];
    totalCount: number;
  };
  status: string;
}
