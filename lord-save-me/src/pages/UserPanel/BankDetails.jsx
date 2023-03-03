import React, { useState } from "react";
import SideBar from "../../components/Sidebar/SideBar";
import PostLoginNavBar from "../../components/NavBar/PostLoginNavBar";
import { Alert, Form, Row, Button } from 'react-bootstrap';

function validateAccountNumber(value) {
    let error = ''
    let status = true
    if (value.length > 14 || value.length === '') {
        status = false
        // error = 'Account Number: Cannot be empty or accept more than 14 digits'
    }
    for (let number of value) {
        if (isNaN(number)) {
            error = "Account Number: Number expected"
            status = false
            break
        }
    }
    return {
        status,
        value,
        error
    }
}

function validateCardNumber(value) {
    let error = ''
    let status = true
    if (value.length > 12 || value.length === '') {
        status = false
        // error = 'Card Number: Cannot be empty or accept more than 12 digits'
    }
    for (let number of value) {
        if (isNaN(number)) {
            error = "Card Number: Number expected"
            status = false
            break
        }
    }
    return {
        status,
        value,
        error
    }
}

function validateCVV(value) {
    let error = ''
    let status = true
    if (value.length > 3 || value.length === '') {
        status = false
        // error = 'CVV: Cannot be empty or accept more than 3 digits'
    }
    for (let number of value) {
        if (isNaN(number)) {
            error = "CVV: Number expected"
            status = false
            break
        }
    }
    return {
        status,
        value,
        error
    }
}

function validateCardHolder(value) {
    let error = ''
    let status = true
    for (let letter of value) {
        if (!isNaN(letter)) {
            error = "Name: Letter expected"
            status = false
            break
        }
    }
    return {
        status,
        value: value.toLocaleUpperCase(),
        error
    }
}

function validateExpiryDate(value) {
    let error = ''
    let status = true
    var expiry_date = new Date(value)
    var diff_ms = Date.now() - expiry_date.getTime();
    var age_dt = new Date(diff_ms);
    const age = Math.abs(age_dt.getUTCFullYear() - 1970);
    console.log(age);
    if (age < 1) {
        
        error = "Expiry Date: Invalid"
        status = false
    }
    return {
        value,
        error,
        status
    }
}

const fieldValidations = {
    account_number: validateAccountNumber,
    card_number: validateCardNumber,
    cvv: validateCVV,
    cardholder: validateCardHolder,
    expiry_date: validateExpiryDate
}


const BankDetails = () => {

    const [placeOtp,setPlaceOtp] = useState(false)

    const [validated,setValidated] = useState(false)

    const [error, setError] = useState({
        account_number: '',
        card_number: '',
        cvv: '',
        cardholder: '',
        expiry_date: '',
    });

    const [bankDetails, setBankDetails] = useState({
        account_number: '',
        card_number: '',
        cvv: '',
        cardholder: '',
        expiry_date: '',
    });

    const [verifyOTP, setVerifyOTP] = useState({
        otp:''
    })

    const handleBankDetails = (e) => {
        const targetName = e.target.name
        let valid = { status: true, value: e.target.value }

        const validateFn = fieldValidations[targetName]
        if (typeof validateFn === "function") {
            valid = validateFn(valid.value) // boolean value
            //console.log(valid)
        }
        if (!valid.status) {
            setError({
                ...error,
                [targetName]:valid.error
            })
            return
        } else {
            setError({
                ...error,
                [targetName]:""
            })
        }

        let x = { ...bankDetails };
        x[targetName] = valid.value;
        setBankDetails(x);
        console.log(bankDetails)
    };

    const handleSubmit = (e) => {
        console.log("button working!")
        e.preventDefault();

        const form = e.currentTarget;
            if (form.checkValidity() === false) {
                e.stopPropagation()
            }
            else {
                setValidated(true)
            }

        let isFormEmpty = false;

        for (let x in bankDetails) {
            if (bankDetails[x] === '') {
                console.log("bank details", x, bankDetails[x]);
                isFormEmpty = true;

                break
                //return false;
            }
            setPlaceOtp(true)
        }

        if (isFormEmpty === false) {
            //alert("An OTP has been sent for verification");
            console.log(bankDetails);
        }

    };


    return (
        <>
            <PostLoginNavBar />
            <div style={{ display: 'flex' }}>
                <SideBar />
            <div style={{display:!placeOtp?"block":"none"}}>
                <Form  className="container mt-3 mb-3" autoComplete='off' validated={validated} hasValidation>
                    <Row className="mb-3">
                        {/* <Alert>{error.expiry_date}</Alert> */}
                        <div className="title"> Bank Details </div>
                    </Row>

                    <Row className="mb-4">
                        {/* BANK ACCOUNT NUMBER */}
                        <Form.Group controlId="formBasicEmail" className="col col-sm-9">
                            <Form.Control.Feedback style={{ display: error.account_number ? "block" : "none" }} type='invalid'>{error.account_number}</Form.Control.Feedback>
                            <Form.Label>Bank Account Number</Form.Label>
                            <Form.Control type="account_number" name="account_number" className="form-control" value={bankDetails.account_number} onChange={handleBankDetails} required />
                            <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type='invalid'>Please provide your 14 digit bank account number</Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className="mb-4">
                        {/* CREDIT/DEBIT CARD INFO */}
                        <Form.Group controlId="formBasicEmail" className="col col-sm-9">
                            <Form.Control.Feedback style={{ display: error.card_number ? "block" : "none" }} type='invalid'>{error.card_number}</Form.Control.Feedback>
                            <Form.Label>Credit / Debit Card Number</Form.Label>
                            <Form.Control type="card_number" name="card_number" className="form-control" value={bankDetails.card_number} onChange={handleBankDetails} required />
                            <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type='invalid'>Please provide your credit/debit card number</Form.Control.Feedback>
                        </Form.Group>
                        {/* CVV */}
                        <Form.Group controlId="formBasicEmail" className="col col-sm-3">
                            <Form.Control.Feedback style={{ display: error.cvv ? "block" : "none" }} type='invalid'>{error.cvv}</Form.Control.Feedback>
                            <Form.Label>CVV</Form.Label>
                            <Form.Control type="password" name="cvv" className="form-control" value={bankDetails.cvv} onChange={handleBankDetails} required />
                            <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type='invalid'>Please enter your cvv</Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        {/* CARD HOLDER"S NAME*/}
                        <Form.Group controlId="formGridpin" className="col col-sm-6">
                            <Form.Control.Feedback style={{ display: error.cardholder ? "block" : "none" }} type='invalid'>{error.cardholder}</Form.Control.Feedback>
                            <Form.Label>Card Holder's Name</Form.Label>
                            <Form.Control className="form-control" type="text" name="cardholder" value={bankDetails.cardholder} onChange={handleBankDetails} required />
                            <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type='invalid'>Please provide the name on the card</Form.Control.Feedback>
                        </Form.Group>
                        {/* CARD EXPIRY DATE */}
                        <Form.Group controlId="formGridpin" className="col col-sm-5">
                            <Form.Control.Feedback style={{ display: error.expiry_date ? "block" : "none" }} type='invalid'>{error.expiry_date}</Form.Control.Feedback>
                            <Form.Label>Expiry Date</Form.Label>
                            <Form.Control className="form-control" type="date" name="expiry_date" value={bankDetails.expiry_date} onChange={handleBankDetails} required />
                            <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type='invalid'>Please provide the expiry date of your card</Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    {/* SUBMIT BUTTON */}
                    <Row className="mb-3">
                        <Form.Group controlId="formGridCheckbox" className="col col-sm-2 text-center">
                            <Button type="submit" className="me-4 btn btn-success btn-xs btn-block" onClick={handleSubmit}>
                                Submit</Button>
                        </Form.Group>
                    </Row>
                    </Form>
                </div>
                <div style={{display:placeOtp?"block":"none"}}>
                
                {/* OTP */}
                    <Form>
                        <Row>
                    <Form.Group controlId="formGridpin" className="col col-sm-6">
                            <Form.Label>Enter OTP</Form.Label>
                            <Form.Control className="form-control" type="text" name="otp" value={verifyOTP.otp}  />
                        </Form.Group>
                        <Form.Group controlId="formGridCheckbox" className="col col-sm-5">
                            <Button type="submit" className="me-4 mt-4 btn-xs">Check OTP</Button>
                            </Form.Group>
                            </Row>
                        </Form>
                
                </div>
            </div>
            
        </>
    );
}

export default BankDetails

// 1. bank account number >> check button
// 2. credit/debit card number >> check button
// 3. cvv >> check button
// 4. expiry date >> check button