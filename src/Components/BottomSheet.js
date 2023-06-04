import React, {
  useRef,
  useMemo,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from "react";
import { StyleSheet } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
export const CustomBottomSheet = forwardRef(({ children }, ref) => {
  const sheetRef = useRef(null);

  const snapPoints = useMemo(() => [80, "75%"], []);

  // callbacks
  const handleSheetChange = useCallback((index) => {}, []);
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
      handleComponent={null}
      style={styles.contentContainer}
      backgroundStyle={styles.backgroundStyle}
      enableOverDrag={false}
      enableContentPanningGesture={false}
    >
      <BottomSheetScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </BottomSheetScrollView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  backgroundStyle: {
    backgroundColor: "white",
  },
});

export default BottomSheet;
