import React from 'react'
import { Formik, Field, Form, ErrorMessage, useField } from 'formik'
import * as Yup from 'yup'

const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <div>
            <input className='text-input' {...field} {...props} />
            </div>
            {meta.touched && meta.error ? (
                <div className='error'>{meta.error}</div>
            ) : null}
        </>
    )
}

const MyCheckbox = ({ children, ...props }) => {
    const [field, meta] = useField({ ...props, type: 'checkbox' })

    return (
        <div>
            <label className='checkbox'>
                <input type='checkbox' {...field} {...props} />
                {children}
            </label>
            {meta.touched && meta.error ? (
                <div className='error'>{meta.error}</div>
            ) : null}
        </div>
    )
}

const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props)

    return (
        <div>
            <label htmlFor={props.name}>{label}</label>
            <div>
            <select {...field} {...props} />
            </div>
            {meta.touched && meta.error ? (
                <div className='error'>{meta.error}</div>
            ) : null}
        </div>
    )
}

const initialValues = {
    userName: '',
    userEmail: '',
    userPhoneNumber: '',
    language: '',
    acceptedTerms: false
}

const nameRegExpr = /^[a-zA-Zа-яА-Я\s-]/s

const validation = Yup.object({
    userName: Yup.string()
        .required(),

    userPhoneNumber: Yup.string()
        .required(),

    userEmail: Yup.string()
        .email('Введено не корректное значение')
        .required('Поле обязательно для заполнения'),

    acceptedTerms: Yup.boolean()
        .required()
        .oneOf([true], 'Вы должны подтвердить принятие условий использования'),

    language: Yup.string()
        .oneOf(
            ['rus', 'eng', 'chn', 'esp'],
            'Не выбран язык'
        )
        .required('Поле обязательно для заполнения')
    
})

const submit = (values, {setSubmitting}) => {
    setTimeout(() => {
        alert(JSON.stringify(values, null, 2))
        setSubmitting(false)
    }, 400)
}

const checkValid = JSON.stringify(values)

const SignupForm = () => {
    return (
        <>
            <h1>Регистрация</h1>
            <label>Уже есть аккаунт? <a href='#'>Войти</a></label>
            <Formik
                initialValues={initialValues}
                validationSchema={validation}
                onSubmit={submit}
            >
                <Form >
                    <div>
                    <MyTextInput
                        label='Имя'
                        name='userName'
                        type='text'
                        placeholder='Введите Ваше имя'
                        />
                    </div>
                    <div>
                    <MyTextInput
                        label='Email'
                        name='userEmail'
                        type='email'
                        placeholder='Введите ваш email'
                        />
                    </div>
                    <div>
                    <MyTextInput
                        label='Номер телефона'
                        name='userPhoneNumber'
                        type='tel'
                        placeholder='Введите номер телефона'
                        />
                    </div>
                    <div>
                    <MySelect label='Язык' name='language'>
                        <option value=''>Язык</option>
                        <option value='rus'>Русский</option>
                        <option value='eng'>Английский</option>
                        <option value='chn'>Китайский</option>
                        <option value='esp'>Испанский</option>
                    </MySelect>
                    </div>
                    <div>
                    <MyCheckbox name='acceptedTerms'>
                        Принимаю <a href='#'>условия</a> использования
                    </MyCheckbox>
                    </div>

                    <button type='submit'>Зарегестрироваться</button>
                </Form>
            </Formik>
        </>
    )
}

export default SignupForm;