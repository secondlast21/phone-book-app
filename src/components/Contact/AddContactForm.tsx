import React, {FC, useState} from "react"
import {ADD_CONTACT_WITH_PHONES} from "@/services/queries";
import {useMutation} from "@apollo/client";
import Button from "@/components/Base/Button";
import Modal from "@/components/Base/Modal";

interface PhoneData {
    number: string;
}

interface FormData {
    first_name: string;
    last_name: string;
    phones: PhoneData[];
}

const inputStyles = {
    backgroundColor: '#242428',
    border: '1px solid #fedd95',
    padding: '10px',
    margin: '10px 0',
    color: '#fedd95',
    borderRadius: '5px',
    width: '100%',
};

const AddContactForm: FC = () => {
    const [isModalSuccessOpen, setIsModalSuccessOpen] = useState(false);
    const [isModalFailedOpen, setIsModalFailedOpen] = useState(false);

    const openSuccessModal = () => setIsModalSuccessOpen(true)
    const closeSuccessModal = () => setIsModalSuccessOpen(false);

    const openFailedModal = () => setIsModalFailedOpen(true)
    const closeFailedModal = () => setIsModalFailedOpen(false);

    const [formData, setFormData] = useState<FormData>({
        first_name: '',
        last_name: '',
        phones: [{ number: '' }],
    });

    const [addContact] = useMutation(ADD_CONTACT_WITH_PHONES);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        if (name === 'phones') {
            const phones = value.split('\n').map((number) => ({ number: number.trim() }));
            setFormData({ ...formData, [name]: phones });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log(formData)
        try {
            await addContact({ variables: formData });
            setFormData({ first_name: '', last_name: '', phones: [{ number: '' }] });
            setIsModalSuccessOpen(true)

        } catch (error) {
            setIsModalFailedOpen(true)
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ borderColor: '#fedd95', color: '#fedd95', backgroundColor: '#242428' }}>
            <h3 style={{textAlign:'center', margin:'10px 0'}}>Add New Contact</h3>
            <div>
                <label>First Name:</label>
                <br/>
                <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    style={inputStyles}
                    placeholder={'Enter your first name'}
                    required
                />
            </div>
            <div>
                <label>Last Name:</label>
                <br/>
                <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    style={inputStyles}
                    onChange={handleChange}
                    placeholder={'Enter your last name'}
                    required
                />
            </div>
            <div>
                <label>Phone Numbers (One phone number per line):</label>
                <br/>
                <textarea
                    name="phones"
                    value={formData.phones.map((phone) => phone.number).join('\n')}
                    onChange={handleChange}
                    style={inputStyles}
                    placeholder={'Enter your phone number'}
                    required
                />
            </div>
            <div style={{textAlign:'center'}}>
                <Button text={'Submit'} btnType={'submit'}/>
            </div>
            <Modal isOpen={isModalFailedOpen} onClose={closeFailedModal}>
                <h3 style={{textAlign:'center', margin:'10px 0'}}>Failed</h3>
                <p style={{textAlign:'center'}}>Name or telephone number cannot be the same as another contact</p>
            </Modal>
            <Modal isOpen={isModalSuccessOpen} onClose={closeSuccessModal}>
                <h3 style={{textAlign:'center', margin:'10px 0'}}>Success</h3>
                <p style={{textAlign:'center'}}>Your new contact is added</p>
            </Modal>
        </form>
    );
}

export default AddContactForm
