import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';

const ContactItem = ({ contact }) => {
    const contactContext = useContext(ContactContext);
    const { deleteContact, setCurrent, clearCurrent } = contactContext;

    const {
        id,
        name,
        email,
        phone,
        birthday,
        purchaseZipCode,
        lastContacted,
        notes,
        status
    } = contact;

    const onDelete = () => {
        deleteContact(id);
        clearCurrent();
    };

    function customerStatus(input) {
        switch (input) {
            case 'Interested':
                return ' badge badge-primary';
            case 'Ready To Buy':
                return ' badge badge-success';
            case 'On Hold':
                return 'badge badge-danger';
            default:
                return 'badge badge-primary';
        }
    }

    return (
        <div className='card bg-light'>
            <h3 className='text-primary text-left'>
                {name}{' '}
                <span
                    style={{ float: 'right' }}
                    className={customerStatus(status)}
                >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
            </h3>
            <ul className='list'>
                {email && (
                    <li>
                        <i className='fas fa-envelope-open' /> - <b>Email:</b>{' '}
                        {email}
                    </li>
                )}
                {phone && (
                    <li>
                        <i className='fas fa-phone' /> - <b>Phone:</b> {phone}
                    </li>
                )}
                {birthday && (
                    <li>
                        <i class='fas fa-birthday-cake'></i> - <b>Birthday:</b>{' '}
                        {birthday}
                    </li>
                )}
                {lastContacted && (
                    <li>
                        <i class='fas fa-envelope-open-text'></i> -{' '}
                        <b>Last Contacted:</b> {lastContacted}
                    </li>
                )}
                {purchaseZipCode && (
                    <li>
                        <i class='fas fa-home'></i> - <b> Target Zip Code:</b>{' '}
                        {purchaseZipCode}
                    </li>
                )}
                {notes && (
                    <li>
                        <i class='fas fa-sticky-note'></i> - <b>Notes:</b>{' '}
                        {notes}
                    </li>
                )}
            </ul>
            <p>
                <button
                    className='btn btn-dark btn-sm'
                    onClick={() => setCurrent(contact)}
                >
                    Edit
                </button>
                <button className='btn btn-danger btn-sm' onClick={onDelete}>
                    Delete
                </button>
            </p>
        </div>
    );
};

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired
};

export default ContactItem;
