import React, { useContext, useRef, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBBtn,
    MDBIcon,
    MDBModalFooter
} from "mdbreact";

const ContactFilter = () => {
    const contactContext = useContext(ContactContext);
    const text = useRef(" ");

    const { filterContacts, clearFilter, filtered } = contactContext;

    useEffect(() => {
        if (filtered === null) {
            text.current.value = "";
        }
    });

    const onChange = e => {
        if (text.current.value !== "") {
            filterContacts(e.target.value);
        } else {
            clearFilter();
        }
    };
    return (
        <form>
            <MDBInput
                ref={text}
                type="text"
                label="Filter Contacts..."
                onChange={onChange}
            />
            <br></br>
        </form>
    );
};

export default ContactFilter;
