import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
import { MDBInput, MDBBtn } from 'mdbreact';
const ContactForm = () => {
    const contactContext = useContext(ContactContext);

    const {
        addContact,
        updateContact,
        clearCurrent,
        current,
        getNorris
    } = contactContext;

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
        // eslint-disable-next-line
    }, [contactContext, current]);

    const [norrisJoke, setNorrisJoke] = useState({
        jokes: []
    });

    useEffect(() => {
        const joke = getNorris();
        setNorrisJoke(joke);
        // eslint-disable-next-line
    }, []);

    // console.log(getNorris());

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

            {/* <p></p> */}
            <MDBInput
                type='text'
                label='Name'
                name='name'
                value={name}
                onChange={onChange}
            />
            <MDBInput
                type='email'
                label='Email'
                name='email'
                value={email}
                onChange={onChange}
            />
            <MDBInput
                type='text'
                label='Phone'
                name='phone'
                value={phone}
                onChange={onChange}
            />
            <MDBInput //zip code
                type='text'
                label='Purchase Zip Code'
                name='purchaseZipCode'
                value={purchaseZipCode}
                onChange={onChange}
            />
            <MDBInput
                type='text'
                label='Notes'
                name='notes'
                value={notes}
                onChange={onChange}
            />
            <MDBInput
                type='text'
                label='Last Contacted Date'
                name='lastContacted'
                value={lastContacted}
                onChange={onChange}
            />
            <MDBInput
                type='text'
                label='Birthday'
                name='birthday'
                value={birthday}
                onChange={onChange}
            />
            <h3>Status</h3>
            <div className='customer-status'>
                <input
                    className=''
                    type='radio'
                    name='status'
                    value='Interested'
                    checked={status === 'Interested'}
                    onChange={onChange}
                />{' '}
                Interested{' '}
                <input
                    className='status-choice'
                    type='radio'
                    name='status'
                    value='Ready To Buy'
                    checked={status === 'Ready To Buy'}
                    onChange={onChange}
                />{' '}
                Ready To Buy{' '}
                <input
                    className='status-choice'
                    type='radio'
                    name='status'
                    value='On Hold'
                    checked={status === 'On Hold'}
                    onChange={onChange}
                />{' '}
                On Hold{' '}
            </div>
            <div>
                <MDBInput
                    type='submit'
                    gradient='blue'
                    value={current ? 'Update Contact' : 'Add Contact'}
                    className='btn btn-primary btn-block'
                >
                    {' '}
                </MDBInput>
            </div>

            {current && (
                <div>
                    <MDBBtn
                        color='red'
                        className='btn btn-danger btn-block'
                        onClick={clearAll}
                    >
                        Clear
                    </MDBBtn>
                </div>
            )}
        </form>
    );
};

export default ContactForm;
