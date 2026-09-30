import React, { useEffect, useRef } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { UserProfile, ProcedureRecord } from '../types';

interface Props {
  userProfile: UserProfile;
}

const NotificationManager: React.FC<Props> = ({ userProfile }) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!userProfile.pushNotificationsEnabled || !auth.currentUser) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    const checkAndSendNotifications = async () => {
      if (!('Notification' in window) || Notification.permission !== 'granted') return;

      try {
        const q = query(collection(db, 'procedures'), where('userId', '==', auth.currentUser!.uid), where('completed', '==', false));
        const snapshot = await getDocs(q);
        const procedures = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ProcedureRecord));

        if (procedures.length === 0) return;

        // Sort by creation date (oldest first, assuming they are more urgent)
        procedures.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

        // Pick the most urgent one
        const urgentProc = procedures[0];

        new Notification('CareLens Health Reminder', {
          body: `Don't forget your recommended ${urgentProc.type.toLowerCase()}: ${urgentProc.name} at ${urgentProc.facility}.`,
          icon: '/favicon.ico'
        });
      } catch (error) {
        console.error("Error fetching procedures for notifications", error);
      }
    };

    // Initial check
    checkAndSendNotifications();

    // Set up interval (e.g., every 5 minutes for demo purposes, or based on urgency)
    intervalRef.current = setInterval(checkAndSendNotifications, 5 * 60 * 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [userProfile.pushNotificationsEnabled]);

  return null;
};

export default NotificationManager;
