import React, {
  useRef,
  useMemo,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
export const CustomBottomSheet = forwardRef(({ children }, ref) => {
  const sheetRef = useRef(null);

  const snapPoints = useMemo(() => [80, "70%"], []);

  // callbacks
  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  useImperativeHandle(ref, () => {
    return {
      snapToZeroIndex() {
        handleSnapPress(0);
      },
      snapToFirstIndex() {
        handleSnapPress(1);
      },
      close() {
        sheetRef.current?.close();
      },
    };
  });
  return (
    <BottomSheet
      index={-1}
      ref={sheetRef}
      snapPoints={snapPoints}
      onChange={handleSheetChange}
      enableTouchThrough={true}
      enablePanDownToClose
      enableOverDrag
      enableHandlePanningGesture
    >
      <BottomSheetView>{children}</BottomSheetView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default BottomSheet;
