import React, {useEffect} from 'react';
import {ESheetID} from '../../../types/sheets';
import {useSheetContext} from '../contexts/SheetContext';
import {LockScreen} from '../screens/lock-screen';

export const SheetRegistration: React.FC = () => {
  const {registerSheet} = useSheetContext();

  useEffect(() => {
    registerSheet(ESheetID.ACTION_BUTTON_SHEET, LockScreen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
