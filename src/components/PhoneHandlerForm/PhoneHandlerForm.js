import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { joiResolver } from '@hookform/resolvers/joi';

import './PhoneHandlerForm.css';
import { constants } from '../../config';
import { createUser, updateUser } from '../../store';
import { personSchema } from '../../formValidation';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

const PhoneHandlerForm = ({ closeModal }) => {
    const { reducer } = constants;

    const { uid } = useParams();
    const dispatch = useDispatch();
    const { selectedPerson } = useSelector((state) => state[reducer]);
    const [phoneNumbers, setPhoneNumbers] = useState(uid ? selectedPerson.phoneNumbers : []);
    const [updatedPhone, setUpdatedPhone] = useState(null);

    const {
        register,
        watch,
        resetField,
        setValue,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm({ resolver: joiResolver(personSchema), mode: 'onTouched' });

    const watchPhoneNumber = watch('phoneNumbers');

    const resetFields = () => {
        resetField('name');
        setPhoneNumbers([]);
    };

    const handlePhoneNumber = () => {
        if (updatedPhone) {
            const updatedPhoneIndex = phoneNumbers.indexOf(updatedPhone);
            const tempPhoneNumbers = [...phoneNumbers];
            tempPhoneNumbers.splice(updatedPhoneIndex, 1, watchPhoneNumber);
            setPhoneNumbers([...tempPhoneNumbers]);
        }

        if (!phoneNumbers.includes(watchPhoneNumber) && !updatedPhone && watchPhoneNumber) {
            setPhoneNumbers([...phoneNumbers, watchPhoneNumber]);
        }

        resetField('phoneNumbers');
        setUpdatedPhone(null);
    };

    const sendUserData = (data) => {
        const reqBody = { ...data, phoneNumbers };

        if (uid) {
            dispatch(updateUser({ id: uid, data: reqBody }));
            closeModal();
            return;
        }

        dispatch(createUser({ data: reqBody }));
        resetFields();
    };

    const removeFromList = (event, listItem) => {
        event.stopPropagation();
        const filteredPhoneNumbers = phoneNumbers.filter((phone) => phone !== listItem);
        setPhoneNumbers(filteredPhoneNumbers);
    };

    const setPhoneNumberToUpdate = (phone) => {
        setValue('phoneNumbers', phone);
        setUpdatedPhone(phone);
    };

    return (
        <form onSubmit={handleSubmit(sendUserData)} className="phone__form">
            <input
                defaultValue={uid ? selectedPerson?.name : ''}
                type="text"
                {...register('name')}
                className="field"
                placeholder="enter person name"
            />
            {errors.name && <ErrorMessage error={errors.name} />}
            {!!phoneNumbers.length && (
                <ul className="phone__form-numbers">
                    {phoneNumbers.map((phone, index) => (
                        <li onClick={() => setPhoneNumberToUpdate(phone)} key={index}>
                            {phone}
                            <span onClick={(event) => removeFromList(event, phone)} className="btn">
                                &times;
                            </span>
                        </li>
                    ))}
                </ul>
            )}
            <div className="phone__form-input">
                <input
                    defaultValue={''}
                    type="text"
                    {...register('phoneNumbers', {
                        onChange: () => !watchPhoneNumber && setUpdatedPhone(null)
                    })}
                    className="field"
                    placeholder="phone number"
                />
                <button
                    type="button"
                    onClick={handlePhoneNumber}
                    className="phone__form-add-btn"
                    disabled={errors.phoneNumbers || !watchPhoneNumber}>
                    {updatedPhone ? 'Update' : 'Add'}
                </button>
            </div>
            {errors.phoneNumbers && <ErrorMessage error={errors.phoneNumbers} />}
            <button
                type="submit"
                className="phone__form-save-btn"
                disabled={!isValid || !phoneNumbers.length}>
                Save
            </button>
        </form>
    );
};

export { PhoneHandlerForm };
