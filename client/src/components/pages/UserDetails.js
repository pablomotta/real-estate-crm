import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';

const UserDetails = ({ contact }) => {
    const contactContext = useContext(ContactContext);
    const { deleteContact, setCurrent, clearCurrent } = contactContext;

    const {
        id,
        name,
        email,
        phone,
        purchaseZipCode,
        notes,
        lastContacted,
        birthday,
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
        <div className='grid-2'>
            <div className='bg-light'>
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
                    {birthday && (
                        <li>
                            <i class='fas fa-birthday-cake'></i> {birthday}
                        </li>
                    )}
                    {email && (
                        <li>
                            <i className='fas fa-envelope-open' /> {email}
                        </li>
                    )}
                    {phone && (
                        <li>
                            <i className='fas fa-phone' /> {phone}
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
                    <button
                        className='btn btn-danger btn-sm'
                        onClick={onDelete}
                    >
                        Delete
                    </button>
                </p>
            </div>
            {/* edit bellow */}
            <div className='bg-light'>
                <h3 className='text-primary'>Target Zip Code</h3>
                {purchaseZipCode ? (
                    <h5>{purchaseZipCode}</h5>
                ) : (
                    <h5>Not Available</h5>
                )}
                <h3 className='text-primary'>Last Contacted</h3>
                {lastContacted ? (
                    <h5>{lastContacted}</h5>
                ) : (
                    <h5>Not Available</h5>
                )}
                <h3 className='text-primary'>Notes</h3>
                {notes ? <h5>{notes}</h5> : <h5>Not Available</h5>}
                <Link to='/' className='btn btn-success btn-lg'>
                    {' '}
                    Go Back{' '}
                </Link>
            </div>
        </div>
    );
};

UserDetails.propTypes = {
    contact: PropTypes.object.isRequired
};

export default UserDetails;
