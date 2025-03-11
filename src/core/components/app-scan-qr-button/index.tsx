import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import AppText from '../app-text';
import AppTheme from '../../themes/app-themes';
import {ESheetID} from '../../screens/sheet/types/sheets';
import {useSheetContext} from '../../screens/sheet/contexts/SheetContext';

const AppScanQRButton = () => {
  const {openSheet} = useSheetContext();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() =>
        openSheet(ESheetID.SCAN_QR_CODE_SHEET, {
          visible: true,
          title: 'Scan Package',
          onClose: () =>
            openSheet(ESheetID.SCAN_QR_CODE_SHEET, {visible: false}),
        })
      }>
      <AppText style={styles.text}>Scan QR Code</AppText>
    </TouchableOpacity>
  );
};

export default AppScanQRButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: AppTheme.palette.status.success,
    alignItems: 'center',
    justifyContent: 'center',
    padding: AppTheme.spacing.md,
    borderRadius: AppTheme.borderRadius.md,
    marginHorizontal: AppTheme.spacing.xl,
  },
  text: {
    color: AppTheme.palette.text.secondary,
  },
});
