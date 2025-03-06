import {useEffect, useState} from 'react';
import {DatabaseService} from '../services';

export const useDatabase = () => {
  const [isReady, setIsReady] = useState(false);
  const db = DatabaseService.getInstance();

  useEffect(() => {
    const initDb = async () => {
      await db.initDatabase();
      setIsReady(true);
    };

    initDb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {db, isReady};
};
