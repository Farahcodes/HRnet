import { Controller } from 'react-hook-form';
import DatePicker from 'react-date-picker';

/**
 * `ControllerDatePicker` Component
 *
 * This component serves as a controlled date picker using the `react-hook-form` for form management
 * and `react-date-picker` for the UI and date handling. Used within forms that
 * use `react-hook-form` for state management and validation.
 *
 * Props:
 * - `name`: A string that represents the name attribute of the date input field.
 * - `control`: An object that is used by `react-hook-form` to register this input in the context of a form.
 * - `labelRef`: A ref object that might be used for focusing the input field (or any other applicable use per your use-case).
 *
 * @param {Object} props - Contains {name, control, labelRef} properties.
 *
 * @returns A controlled date picker input component.
 */

const ControllerDatePicker = (props) => {
  return (
    /**
     * Controller
     *
     * The Controller component from react-hook-form takes care of the registration and de-registration
     * of our DatePicker input field within a containing form, handling updates of the form state as the
     * input changes.
     *
     * Props:
     * - `name`: The name of the field in form state.
     * - `control`: An object which is used by react-hook-form to control registered inputs.
     * - `render`: A function for rendering UI, it provides the `field` object which contains `onChange`, `onBlur`, and `value` properties.
     */
    <Controller
      name={props.name}
      control={props.control}
      render={({ field }) => (
        /**
         *
         * The DatePicker component from `react-date-picker` library provides a UI for date input. It
         * allows users to input a date in various formats and provides a dropdown calendar.
         *
         * Props:
         * - `name`: A string defining the name attribute of the date input.
         * - `onChange`: A function that receives the new date value when it changes.
         * - `value`: The current value of the date input.
         * - `ref`: Can be used to provide a ref to the internal input field.
         * - `calendarAriaLabel`: Accessibility label for the toggle calendar button.
         * - `clearAriaLabel`: Accessibility label for the clear value button.
         */
        <DatePicker
          name="start-date"
          onChange={(date) => field.onChange(date)}
          value={field.value}
          ref={props.labelRef}
          calendarAriaLabel="Toggle calendar"
          clearAriaLabel="Clear value"
        />
      )}
    />
  );
};

export default ControllerDatePicker;
