'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TG_InputField from '@/src/components/ui/inputs/TG_InputField';
import TG_Button from '@/src/components/ui/buttons/MainButtons';
import { tgi_arrow_right_white } from '@/src/utils/assets/icons';

const BusinessContactForm = () => {
    const [form, setForm] = useState({
        name: '',
        mobile: '',
        email: '',
        message: '',
        termsAccepted: false,
    });

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (form.termsAccepted) {
            alert('Form submitted successfully!');
        } else {
            alert('Please accept the terms and conditions.');
        }
    };

    return (
        <section className="" id="business-contact-form">
            <div className="md:max-w-7xl container">
                <div className="flex md:flex-row flex-col justify-between items-center gap-6">
                    {/* Left - Form */}
                    <div className="bg-white shadow-lg border border-gray-light rounded-2xl w-full md:max-w-[900px]">
                        <div className="w-full h-[131px] md:h-[160px]">
                            <Image
                                src={
                                    'https://images.tractorgyan.com/uploads/120106/687f82d685f3a-bussiness-banner-desktop.webp'
                                }
                                alt="Business Contact Form"
                                title="Business Contact Form"
                                width={100}
                                height={100}
                                className="hidden md:block w-full h-full fill"
                            />
                            <Image
                                src={
                                    'https://images.tractorgyan.com/uploads/120107/687f8303418a6-bussiness-banner-mobile.webp'
                                }
                                alt="Business Contact Form"
                                title="Business Contact Form"
                                width={100}
                                height={100}
                                className="md:hidden w-full h-full fill"
                            />
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4 p-6 md:px-8 pt-4">
                            <p className="text-gray-description text-sm md:text-base">
                                Enter your comments through the form below, and our customer service professionals
                                will contact you as soon as possible.
                            </p>
                            <div className="gap-x-4 gap-y-2 grid grid-cols-4 mb-4">
                                <div className="col-span-6 md:col-span-2">
                                    <TG_InputField
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Enter Name"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                        label="Name"
                                    />
                                </div>
                                <div className="col-span-6 md:col-span-2">
                                    <TG_InputField
                                        id="mobile"
                                        name="mobile"
                                        type="tel"
                                        placeholder="0000000000"
                                        value={form.mobile}
                                        onChange={handleChange}
                                        pattern="[6-9]{1}[0-9]{9}"
                                        maxLength="10"
                                        required
                                        label="Mobile"
                                        prefix="+91"
                                    />
                                </div>
                            </div>

                            <TG_InputField
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email here"
                                value={form.email}
                                onChange={handleChange}
                                required
                                label="Email"
                            />
                            <TG_InputField
                                id="message"
                                name="message"
                                type="textarea"
                                isTextarea
                                placeholder="Enter your message or query"
                                value={form.message}
                                onChange={handleChange}
                                required
                                label="Message"
                            />

                            <div className="inline-flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    name="terms"
                                    className="w-3.5 h-3.5 text-blue-600 form-checkbox"
                                    required
                                    defaultChecked
                                />
                                <label htmlFor="terms" className="text-gray-dark text-sm">
                                    By proceeding ahead you expressly agree to the TractorGyan{' '}
                                    <Link
                                        href={'https://tractorgyan.com/terms-of-use'}
                                        className="ms-1 font-bold text-blue-link"
                                    >
                                        Terms and Condition
                                    </Link>
                                </label>
                            </div>

                            <TG_Button
                                type="submit"
                                // disabled={isSubmitting}
                                icon={tgi_arrow_right_white}
                                className="flex justify-center items-center bg-primary mx-auto px-5 py-2.5 rounded-lg w-full max-w-[283px] text-white text-lg"
                            >
                                <span>Submit </span>
                            </TG_Button>
                        </form>
                    </div>

                    {/* Right - Image */}
                    <div className="hidden md:block mx-auto w-[386px] h-[645px]">
                        <Image
                            src="https://images.tractorgyan.com/uploads/120108/687f855d820a9-Partner-Form-Banner.webp"
                            alt="Business Team Meeting"
                            title="Business Team Meeting"
                            width={600}
                            height={600}
                            className="w-full h-full"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BusinessContactForm;
