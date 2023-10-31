import React, { useState } from "react";
import Cookies from 'js-cookie';
import NaijaStates from 'naija-state-local-government';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import "./delivery-detail.component.scss"
const DeliveryDetail = () => {
    const initialFields = {
        firstName: Cookies.get("usersFirstName"),
        lastName: Cookies.get("usersLastName"),
        email: Cookies.get("otpUserEmail"),
        phoneNumber: "",
        homeAddress: "",
        city: "",
        state: ""
    }
    const [fields, setFields] = useState(initialFields);
    const usersFirstName = Cookies.get("usersFirstName");
    const usersLastName = Cookies.get("usersLastName");
    const usersEmailAddress = Cookies.get("otpUserEmail");
    const [nigerianState, setNigerianState] = useState("Abia");
    const NigerianStates = NaijaStates.states();
    const { firstName, lastName, email, phoneNumber, homeAddress, city, state } = fields;
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFields({ ...fields, [name]: value });
    }
    const handleStateChange = (event) => {
        const selectedState = event.target.value;
        setNigerianState(selectedState);
        setFields({ ...fields, state: selectedState });
    }
    const handleNumberChange = (number) =>{
        console.log(number);
        setFields({...fields, phoneNumber: number});
    }
    const NigerianCities = NaijaStates.lgas(`${nigerianState}`).lgas;
    return (
        <div>
            <div>
                <div className="delivery-details">
                    <h2 className="main-texts">Step 2: Delivery Details</h2>
                </div>
                <div className="delivery-details">
                    <div className="name">
                    {
                        usersFirstName
                            ?
                            < input
                                type="text"
                                readOnly
                                value={firstName}
                                name="firstName"
                                className="name-fields" />

                            :
                            <input
                                type='text'
                                className="name-fields"
                                required
                                placeholder="First Name"
                                value={firstName}
                                onChange={handleChange}
                                name="firstName" />

                    }
                    {
                        usersLastName ?
                            <input
                                type="text"
                                readOnly
                                value={lastName}
                                name="lastName"
                                className="name-fields" />
                            :
                            <input
                                type='text'
                                className="name-fields"
                                required
                                placeholder="Last Name"
                                value={lastName}
                                onChange={handleChange}
                                name="lastName" />
                    }
                    </div>
                    <div className="email-phone">
                    {
                        usersEmailAddress ?
                            <input
                                type="email"
                                readOnly
                                value={email}
                                name="email"
                                className="email-field"
                            />
                            :
                            <input
                                type='email'
                                className="email-field"
                                required
                                placeholder="Email"
                                value={email}
                                onChange={handleChange}
                                name="email" />
                    }
                    <PhoneInput
                    placeholder="Enter Phone Number"
                    defaultCountry='NG'
                    value={phoneNumber}
                    onChange={(number) => handleNumberChange(number)}
                    required
                    name= "phoneNumber"
                    className="phone-field"
                    />
                    </div>
                    {/* <input
                        type='tel'
                        className="phone-field"
                        required
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={handleChange}
                        name="phoneNumber" /> */}
                   
                    <input
                        type='text'
                        required
                        className="address-field"
                        placeholder="Home Address"
                        value={homeAddress}
                        onChange={handleChange}
                        name="homeAddress" />
                   
                    <div className="address-state">
                    <select
                        name="state"
                        className="city-field"
                        value={state}
                        required
                        onChange={handleStateChange}
                    >
                        {
                            NigerianStates.map((states) => (
                                <option value={states} key={states}>
                                    {states}                                
                                </option>
                            ))
                        }

                    </select>
                    <select
                        name="city"
                        value={city}
                        className="state-field"
                        required
                        onChange={handleChange}>
                        {
                            NigerianCities.map((cities) => (
                                <option value={cities} key={cities}>
                                    {cities}
                                </option>
                            ))
                        }
                    </select>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default DeliveryDetail;