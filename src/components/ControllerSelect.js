import { Controller } from 'react-hook-form';
import Select from 'react-select';

/**
 * `ControllerSelect` Component
 *
 * This component is responsible for rendering a controlled select input using the `react-hook-form` and
 * `react-select` libraries, offering a user-friendly select box with enhanced user interactivity.
 *
 * Props:
 * - `name`: A string that defines the name attribute of the select input, representing the key in form state.
 * - `control`: An object used by `react-hook-form` to register this input and control re-renders based on form state and input state.
 * - `options`: An array of objects representing all available options in the select input. Each object should contain `label` and `value` properties.
 * - `inputId`: A string to identify the select input uniquely, which can be used for associating label elements.
 *
 * @param {Object} props - Contains {name, control, options, inputId} properties.
 *
 * @returns A controlled select input component.
 */

const ControllerSelect = (props) => {
  return (
    /**
     *
     * This Controller component from `react-hook-form` ensures the registration and de-registration
     * of our Select input within a containing form, managing the updates of the form state as the
     * input changes.
     *
     * Props:
     * - `name`: The name of the field in form state.
     * - `control`: An object from react-hook-form that controls registered inputs.
     * - `render`: A function that renders the UI, it provides the `field` object which contains `onChange`, `onBlur`, and `value` properties.
     */
    <Controller
      name={props.name}
      control={props.control}
      render={({ field }) => (
        /**
         * The Select component from `react-select` library provides a UI for a dropdown select box.
         * It allows users to choose from predefined options.
         *
         * Props:
         * - `options`: An array of option objects, where each object contains `label` and `value` properties.
         * - `onChange`: A function to handle changes to the input value. The selected option object is passed to this function.
         * - `value`: An object representing the currently selected option. Should match one of the objects in the `options` array.
         * - `inputId`: A string that defines the ID of the input field for associating with a label.
         * - `classNamePrefix`: A string that prefixes all of the inner select input's class names.
         */
        <Select
          options={props.options}
          onChange={(data) => {
            field.onChange(data.value);
          }}
          value={props.options.find(
            (option) => option.value === field.value
          )}
          inputId={props.inputId}
          classNamePrefix="select"
        />
      )}
    />
  );
};

export default ControllerSelect;
