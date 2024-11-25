import React from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../redux/cartActions';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../../utilities/ErrorMessage';
import './Checkout.css';
const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const validationSchema = Yup.object({
        firstName: Yup.string()
            .max(15, 'First name must be 15 characters or less')
            .required('First name is required'),
        lastName: Yup.string()
            .max(20, 'Last name must be 20 characters or less')
            .required('Last name is required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required')
            .matches(
                /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/,
                'Email must contain a dot'
            ),
        phone: Yup.string()
            .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
            .required('Phone number is required'),
        address: Yup.string().required('Address is required'),
        zipCode: Yup.string()
            .matches(/^\d{5}(-\d{4})?$/, 'ZIP code must be 5 digits or 5+4 digits')
            .required('ZIP code is required'),
    });
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            zipCode: '',
        },
        validationSchema,
        onSubmit: (values) => {
            dispatch(clearCart());
            navigate('/success');
        },
    });
    return (
        <div className="checkout-container">
            <h2>Checkout</h2>
            <form onSubmit={formik.handleSubmit} className="checkout-form">
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        {...formik.getFieldProps('firstName')}
                    />
                    {formik.touched.firstName && formik.errors.firstName ? (
                        <ErrorMessage message={formik.errors.firstName}  />
                    ) : null}
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        {...formik.getFieldProps('lastName')}
                    />
                    {formik.touched.lastName && formik.errors.lastName ? (
                        <ErrorMessage message={formik.errors.lastName} />
                    ) : null}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <ErrorMessage message={formik.errors.email} />
                    ) : null}
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                        id="phone"
                        name="phone"
                        type="tel"
                        {...formik.getFieldProps('phone')}
                    />
                    {formik.touched.phone && formik.errors.phone ? (
                        <ErrorMessage message={formik.errors.phone} />
                    ) : null}
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                        id="address"
                        name="address"
                        type="text"
                        {...formik.getFieldProps('address')}
                    />
                    {formik.touched.address && formik.errors.address ? (
                        <ErrorMessage message={formik.errors.address} />
                    ) : null}
                </div>
                <div className="form-group">
                    <label htmlFor="zipCode">ZIP Code</label>
                    <input
                        id="zipCode"
                        name="zipCode"
                        type="text"
                        {...formik.getFieldProps('zipCode')}
                    />
                    {formik.touched.zipCode && formik.errors.zipCode ? (
                        <ErrorMessage message={formik.errors.zipCode} />
                    ) : null}
                </div>
                <button type="submit" className="submit-button">
                    Place Order
                </button>
            </form>
        </div>
    );
};
export default Checkout;