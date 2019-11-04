import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
    const contactContext = useContext(ContactContext);

    const { addContact, updateContact, clearCurrent, current } = contactContext;

    useEffect(() => {
        if (current !== null) {
            setContact(current);
        } else {
            setContact({
                name: '',
                email: '',
                phone: '',
                purchaseZipCode: '',
                notes: '',
                lastContacted: '',
                birthday: '',
                status: 'Interested'
            });
        }
    }, [contactContext, current]);

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        purchaseZipCode: '',
        notes: '',
        lastContacted: '',
        birthday: '',
        status: 'Interested'
    });

    const {
        name,
        email,
        phone,
        purchaseZipCode,
        notes,
        lastContacted,
        birthday,
        status
    } = contact;

    const onChange = e =>
        setContact({ ...contact, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (current === null) {
            addContact(contact);
        } else {
            updateContact(contact);
        }
        setContact({
            name: '',
            email: '',
            phone: '',
            purchaseZipCode: '',
            notes: '',
            lastContacted: '',
            birthday: '',
            status: 'Interested'
        });
    };

    const clearAll = () => {
        clearCurrent();
    };
    return (
        <form onSubmit={onSubmit}>
            <h2 className='text-primary'>
                {current ? 'Edit Contact' : 'Add Contact'}
            </h2>
            <input
                type='text'
                placeholder='Name'
                name='name'
                value={name}
                onChange={onChange}
            />
            <input
                type='email'
                placeholder='Email'
                name='email'
                value={email}
                onChange={onChange}
            />
            <input
                type='text'
                placeholder='Phone'
                name='phone'
                value={phone}
                onChange={onChange}
            />
            <input //zip code
                type='text'
                placeholder='Purchase Zip Code'
                name='purchaseZipCode'
                value={purchaseZipCode}
                onChange={onChange}
            />
            <input
                type='text'
                placeholder='Notes'
                name='notes'
                value={notes}
                onChange={onChange}
            />
            <input
                type='text'
                placeholder='Last Contacted'
                name='lastContacted'
                value={lastContacted}
                onChange={onChange}
            />
            <input
                type='text'
                placeholder='Birthday'
                name='birthday'
                value={birthday}
                onChange={onChange}
            />
            <h5>Status</h5>
            <input
                type='radio'
                name='status'
                value='Interested'
                checked={status === 'Interested'}
                onChange={onChange}
            />{' '}
            Interested{' '}
            <input
                type='radio'
                name='status'
                value='Ready To Buy'
                checked={status === 'Ready To Buy'}
                onChange={onChange}
            />{' '}
            Ready To Buy{' '}
            <input
                type='radio'
                name='status'
                value='On Hold'
                checked={status === 'On Hold'}
                onChange={onChange}
            />{' '}
            On Hold{' '}
            <div>
                <input
                    type='submit'
                    value={current ? 'Update Contact' : 'Add Contact'}
                    className='btn btn-primary btn-block'
                />
            </div>
            {current && (
                <div>
                    <button
                        className='btn btn-light btn-block'
                        onClick={clearAll}
                    >
                        Clear
                    </button>
                </div>
            )}
        </form>
    );
};

export default ContactForm;
