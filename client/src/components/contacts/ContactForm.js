import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";
import { MDBInput, MDBBtn, MDBFormInline } from "mdbreact";
const ContactForm = () => {
    const contactContext = useContext(ContactContext);

    const { addContact, updateContact, clearCurrent, current } = contactContext;

    useEffect(() => {
        if (current !== null) {
            setContact(current);
        } else {
            setContact({
                name: "",
                email: "",
                phone: "",
                purchaseZipCode: "",
                notes: "",
                lastContacted: "",
                birthday: "",
                status: "Interested"
            });
        }
    }, [contactContext, current]);

    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        purchaseZipCode: "",
        notes: "",
        lastContacted: "",
        birthday: "",
        status: "Interested"
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
            name: "",
            email: "",
            phone: "",
            purchaseZipCode: "",
            notes: "",
            lastContacted: "",
            birthday: "",
            status: "Interested"
        });
    };

    const clearAll = () => {
        clearCurrent();
    };
    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">
                {current ? "Edit Contact" : "Add Contact"}
            </h2>
            <MDBInput
                type="text"
                label="Name"
                name="name"
                value={name}
                onChange={onChange}
            />
            <MDBInput
                type="email"
                label="Email"
                name="email"
                value={email}
                onChange={onChange}
            />
            <MDBInput
                type="text"
                label="Phone"
                name="phone"
                value={phone}
                onChange={onChange}
            />
            <MDBInput //zip code
                type="text"
                label="Purchase Zip Code"
                name="purchaseZipCode"
                value={purchaseZipCode}
                onChange={onChange}
            />
            <MDBInput
                type="text"
                label="Notes"
                name="notes"
                value={notes}
                onChange={onChange}
            />
            <MDBInput
                type="text"
                label="Last Contacted"
                name="lastContacted"
                value={lastContacted}
                onChange={onChange}
            />
            <MDBInput
                type="text"
                label="Birthday"
                name="birthday"
                value={birthday}
                onChange={onChange}
            />
            <h3>Status</h3>
            <MDBFormInline>
                <MDBInput
                    type="radio"
                    name="status"
                    value="Interested"
                    checked={status === "Interested"}
                    onChange={onChange}
                />{" "}
                Interested{" "}
                <MDBInput
                    type="radio"
                    name="status"
                    value="Ready To Buy"
                    checked={status === "Ready To Buy"}
                    onChange={onChange}
                />{" "}
                Ready To Buy{" "}
                <MDBInput
                    type="radio"
                    name="status"
                    value="On Hold"
                    checked={status === "On Hold"}
                    onChange={onChange}
                />{" "}
                On Hold{" "}
            </MDBFormInline>
            <div>
                <MDBBtn
                    type="submit"
                    gradient="blue"
                    value={current ? "Update Contact" : "Add Contact"}
                    className="btn btn-primary btn-block"
                >
                    Add Contact{" "}
                </MDBBtn>
            </div>
            {current && (
                <div>
                    <MDBBtn
                        color="red"
                        className="btn btn-danger btn-block"
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
