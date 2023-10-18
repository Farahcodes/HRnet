import { useForm } from 'react-hook-form';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import Modal, { openModal } from 'yet-another-react-modal-component';

import ControllerDatePicker from './ControllerDatePicker';
import ControllerSelect from './ControllerSelect';
import { optionsStates, optionsDepartment } from '../formData';
import './FormEmployee.scss';
import { add } from '../store';

/**
 * `FormEmployee` Component
 *
 * This component manages the creation of a new employee, with a form to fill out details
 * like name, date of birth, start date, address, and department.
 *
 * Uses `react-hook-form` for form handling, `redux` for state management, and `react-router-dom` for navigation.
 */

const FormEmployee = () => {
  //  `useForm` to manage form state and submissions
  const { register, handleSubmit, control } = useForm();
  // `useDispatch` to dispatch Redux actions
  const dispatch = useDispatch();
  // `useRef` creates mutable object which holds `.current` property and does not cause re-render when the object is changed
  const dateOfBirth = useRef(null),
    startDate = useRef(null);

  /**
   * `saveEmployee`
   *
   * Asynchronously handles form submissions, where `data` is the form data.
   *
   * 1. Parses date fields into ISO string format
   * 2. Creates an employee object with a generated UUID
   * 3. Dispatches a Redux action to add the new employee data to the state
   * 4. Triggers a success modal once the employee data is saved
   *
   * @param {Object} data - Form data
   */

  const saveEmployee = async (data) => {
    let dateOfBirthParsed, startDateParsed;
    // Parsing date fields while considering timezone offset
    dateOfBirthParsed = (await data.dateOfBirth)
      ? new Date(
          data.dateOfBirth?.getTime() -
            data.dateOfBirth?.getTimezoneOffset() * 60 * 1000
        )
          ?.toISOString()
          .substring(0, 10)
      : undefined;
    startDateParsed = (await data.startDate)
      ? new Date(
          data.startDate?.getTime() -
            data.startDate?.getTimezoneOffset() * 60 * 1000
        )
          ?.toISOString()
          .substring(0, 10)
      : undefined;

    // Constructing employee data with parsed dates and a generated UUID
    const dataParsed = {
      ...data,
      dateOfBirth: dateOfBirthParsed,
      startDate: startDateParsed,
      id: uuidv4(),
    };
    // Dispatching action to add employee data to Redux state
    dispatch(add(dataParsed));
    // Opening success modal upon saving employee data
    openModal('#successModal');
  };

  const DatePickerFocusByRef = (ref) => {
    ref.current.wrapper.querySelector('[name=day]').focus();
  };

  return (
    <>
      <form onSubmit={handleSubmit(saveEmployee)}>
        <h2>Create Employee</h2>
        <div className="inputRow">
          <div className="inputGroup">
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              id="first-name"
              {...register('firstName')}
            />
          </div>

          <div className="inputGroup">
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              id="last-name"
              {...register('lastName')}
            />
          </div>
        </div>

        <div className="inputRow">
          <div className="inputGroup">
            <label onClick={() => DatePickerFocusByRef(dateOfBirth)}>
              Date of Birth
            </label>
            <ControllerDatePicker
              name="dateOfBirth"
              control={control}
              labelRef={dateOfBirth}
            />
          </div>

          <div className="inputGroup">
            <label onClick={() => DatePickerFocusByRef(startDate)}>
              Start Date
            </label>
            <ControllerDatePicker
              name="startDate"
              control={control}
              labelRef={startDate}
            />
          </div>
        </div>

        <fieldset className="address">
          <legend>Address</legend>

          <div className="inputRow">
            <div className="inputGroup">
              <label htmlFor="street">Street</label>
              <input
                id="street"
                type="text"
                {...register('street')}
              />
            </div>

            <div className="inputGroup">
              <label htmlFor="city">City</label>
              <input id="city" type="text" {...register('city')} />
            </div>
          </div>

          <div className="inputRow">
            <div className="inputGroup">
              <label htmlFor="state">State</label>
              <ControllerSelect
                name="state"
                control={control}
                options={optionsStates}
                inputId="state"
              />
            </div>

            <div className="inputGroup">
              <label htmlFor="zip-code">Zip Code</label>
              <input
                id="zip-code"
                type="number"
                {...register('zipCode')}
              />
            </div>
          </div>
        </fieldset>

        <div className="inputGroup">
          <label htmlFor="department">Department</label>
          <ControllerSelect
            name="department"
            control={control}
            options={optionsDepartment}
            inputId="department"
          />
        </div>

        <button type="submit">Save</button>
      </form>
      <Modal id="successModal">
        <h2>Employee Created!</h2>
        <Link to="employees" className="link">
          View Current Employees
        </Link>
      </Modal>
    </>
  );
};

export default FormEmployee;
