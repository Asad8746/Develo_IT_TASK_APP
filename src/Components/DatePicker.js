import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import PropTypes from "prop-types";
import DateTimePickerModal from "react-native-modal-datetime-picker";
export const CustomDatePicker = forwardRef(
  (
    {
      mode = "datetime",
      date = new Date(),
      onDatePick = () => {},
      disabled = false,
      ...rest
    },
    ref
  ) => {
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
      if (date) {
        onDatePick(date);
      }
      hideDatePicker();
    };
    return (
      <>
        <DateTimePickerModal
          date={date}
          isVisible={isDatePickerVisible}
          minimumDate={new Date()}
          mode={mode}
          minuteInterval={59}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          is24Hour
          {...rest}
        />
      </>
    );
  }
);

CustomDatePicker.propTypes = {
  mode: PropTypes.string,
  onDatePick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
