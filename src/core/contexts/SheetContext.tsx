import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  ComponentType,
} from 'react';
import {ESheetID} from '../types/sheets';

type SheetComponent = ComponentType<any>;
type SheetRegistry = Record<ESheetID, SheetComponent>;

interface SheetContextType {
  registerSheet: (id: ESheetID, component: SheetComponent) => void;
  openSheet: (id: ESheetID, props?: any) => void;
  closeSheet: () => void;
}

const SheetContext = createContext<SheetContextType | null>(null);

export const SheetProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [sheets, setSheets] = useState<SheetRegistry>({} as SheetRegistry);
  const [activeSheet, setActiveSheet] = useState<{
    id: ESheetID | null;
    props?: any;
  }>({id: null});

  const registerSheet = (id: ESheetID, component: SheetComponent) => {
    setSheets(prev => ({...prev, [id]: component}));
  };

  const openSheet = (id: ESheetID, props?: any) => {
    setActiveSheet({id, props});
  };

  const closeSheet = () => {
    setActiveSheet({id: null});
  };

  const ActiveSheetComponent = activeSheet.id ? sheets[activeSheet.id] : null;

  return (
    <SheetContext.Provider value={{registerSheet, openSheet, closeSheet}}>
      {children}
      {ActiveSheetComponent && <ActiveSheetComponent {...activeSheet.props} />}
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
