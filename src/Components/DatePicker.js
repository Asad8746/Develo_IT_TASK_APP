import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export const CustomDatePicker = forwardRef((props, ref) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  useImperativeHandle(ref, () => {
    return {
      showDatePicker() {
        setDatePickerVisibility(true);
      },
      hideDatePicker() {
        setDatePickerVisibility(false);
      },
    };
  });

  const hideDatePicker = useCallback(() => {
    setDatePickerVisibility(false);
  }, []);

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };
  return (
    <>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
});
