import React, {createContext, useContext, ReactNode} from 'react';
import {Sheet} from '../components/sheet';
import {useSheet} from '../hooks/useSheet';

interface SheetContextType {
  open: () => void;
  close: () => void;
}

const SheetContext = createContext<SheetContextType | undefined>(undefined);

export const SheetProvider: React.FC<{
  children: ReactNode;
}> = ({children}) => {
  const sheet = useSheet();

  return (
    <SheetContext.Provider value={sheet}>
      {children}
      <Sheet
        isVisible={sheet.isVisible}
        onClose={sheet.close}
        snapPoints={[0.9]}>
        {children}
      </Sheet>
    </SheetContext.Provider>
  );
};

export const useSheetContext = () => {
  const context = useContext(SheetContext);
  if (!context) {
    throw new Error('useSheetContext must be used within a SheetProvider');
  }
  return context;
};
