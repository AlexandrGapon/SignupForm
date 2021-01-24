import React, { useState } from 'react'
import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'
import './formStyles.css'

const MyTextInput = ({ label, ...props }) => {

    const [field, meta] = useField(props)

    return (
        <div className='input-container'>
            <label htmlFor={props.name}>{label}</label>
            <div>
                <input {...field} {...props} />
            </div>
            {meta.touched && meta.error ? (
                <div className='error'>{meta.error}</div>
            ) : null}
        </div>
    )
}

const MyCheckbox = ({ children, ...props }) => {

    const [field, meta] = useField({ ...props, type: 'checkbox' })

    return (
        <div className='checkbox-container'>
            <input id='checkbox' type='checkbox' {...field} {...props} />
            <label htmlFor='checkbox'>{children}</label>
            {meta.touched && meta.error ? (
                <div className='error checkbox-error'>{meta.error}</div>
            ) : null}
        </div>
    )
}

const MySelect = ({ arr, label, ...props }) => {

    const [active, setActive] = useState(false)

    const toggleActive = (active) => {
        setActive(prev => !prev)
    }

    const [value, setValue] = useState('')

    let optionValue = ''

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j] === value) {
                optionValue = arr[i][j + 1]
            }
        }
    }

    return (
        <div className='form-selector'>
            <label className='select-container-label' htmlFor='select-container'>{label}</label>
            <div id='select-container' className='container'>
                <div className='select-box'>

                    {active &&
                        <div onClick={toggleActive} className='options-container'>

                            {arr.map(p => {
                                return (
                                    <div key={p.id + 1} onClick={() => setValue(p[0])} className='option'>
                                        <input type='radio' className='radio' id={p[0]} />
                                        <label htmlFor={p[0]}>{p[1]}</label>
                                    </div>
                                )
                            })
                            }

                        </div>}

                    {!value ? (<div onClick={toggleActive} className={`selected ${active && 'active'}`}>
                        {label}
                    </div>) : (<div onClick={toggleActive} className={`selected ${active && 'active'} optionActive`}>
                        {optionValue}
                    </div>)
                    }
                </div>
            </div>
        </div>
    )
}

const initialValues = {
    userName: '',
    userEmail: '',
    userPhoneNumber: '',
    language: '',
    acceptedTerms: false,
}

const arr = [['rus', 'Русский'], ['eng', 'Английский'], ['chn', 'Китайский'], ['esp', 'Испанский']]

const validation = Yup.object({

    userName: Yup.string()
        .matches(/^[a-zA-Zа-яА-Я -]+$/i, 'Введено не корректное значение')
        .required('Поле обязательно для заполнения'),

    userPhoneNumber: Yup.string()
        // eslint-disable-next-line
        .matches(/^(8|\+7)\-?\(?\d{3}\)?\-?\d{3}\-?\d{2}\-?\d{2}$/, 'Введено не корректное значение')
        .required('Поле обязательно для заполнения'),

    userEmail: Yup.string()
        .email('Введено не корректное значение')
        .required('Поле обязательно для заполнения'),

    acceptedTerms: Yup.boolean()
        .required('Поле обязательно для заполнения')
        .oneOf([true], 'Вы должны подтвердить принятие условий использования'),
})

const submit = (values, { setSubmitting }) => {

    setTimeout(() => {

        alert(JSON.stringify(values, null, 2))
        setSubmitting(false)
    }, 400)
}

const SignupForm = () => {

    return (
        <div className={'form'}>
            <div className='title-container'>
                <div className='signup-title'>
                    <h1>Регистрация</h1>
                </div>
                <div className='signup-description'>
                    {/* eslint-disable-next-line */}
                    <label>Уже есть аккаунт? </label> <a href='#'>Войти</a>
                </div>
            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={validation}
                onSubmit={submit}
            >
                {({ isValid, dirty }) => (
                    <Form >
                        <div className='form-container'>
                            <div className='inputs-container'>

                                <div className='flexOne'>
                                    <div className='form-input-container'>
                                        <MyTextInput
                                            label='Имя'
                                            name='userName'
                                            type='text'
                                            placeholder='Введите Ваше имя'
                                        />
                                    </div>
                                    <div className='form-input-container'>
                                        <MyTextInput
                                            label='Email'
                                            name='userEmail'
                                            type='email'
                                            placeholder='Введите ваш email'
                                        />
                                    </div>
                                </div>
                                <div className='flexTwo'>
                                    <div className='form-input-container'>
                                        <MyTextInput
                                            label='Номер телефона'
                                            name='userPhoneNumber'
                                            type='tel'
                                            placeholder='Введите номер телефона'
                                        />
                                    </div>

                                    <div className='form-select-container'>
                                        <MySelect label='Язык' arr={arr} name='languange' />
                                    </div>
                                </div>
                            </div>

                            <div className='bot-container'>
                                <div className='form-checkbox-container'>
                                    <MyCheckbox name='acceptedTerms'>
                                        {/* eslint-disable-next-line */}
                                            Принимаю&ensp;<a href='#'>условия</a>&ensp;использования
                                        </MyCheckbox>
                                </div>


                                <div className='button-container'>
                                    <button type='submit' disabled={!isValid || !dirty} >Зарегестрироваться</button>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>

        </div>
    )
}

export default SignupForm;