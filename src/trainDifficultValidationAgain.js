import {useEffect, useState} from "react";

const TrainDifficultValidationAgain = () => {


    const useValidation = (value, validations) => {
        const [isEmpty, setIsEmpty] = useState(true)
        const [emailError, setEmailError] = useState(false)
        const [minLengthError, setMinLengthError] = useState(false)
        const [maxLengthError, setMaxLengthError] = useState(false)
        const [validateInput, setValidateInput] = useState(false)

        useEffect(() => {
            for (const validation in validations) {
                switch (validation) {
                    case 'isEmpty':
                        value ? setIsEmpty(false) : setIsEmpty(true)
                        break
                    case 'emailError':
                        const re = /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/;
                        re.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true)
                        break
                    case 'minLengthError':
                        value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false)
                        break
                    case 'maxLengthError':
                        value.length > validations[validation] ? setMaxLengthError(true) : setMaxLengthError(false)
                        break
                }
            }
        }, [value])

        useEffect(() => {
            if (maxLengthError || minLengthError || isEmpty || emailError) {
                setValidateInput(false)
            } else {
                setValidateInput(true)
            }
        }, [maxLengthError, minLengthError, isEmpty, emailError])

        return {
            maxLengthError, minLengthError, isEmpty, emailError, validateInput
        }
    }

    const useInput = (initialValue, validations) => {
        const [value, setValue] = useState(initialValue)
        const [dirty, setDirty] = useState(false)
        const valid = useValidation(value, validations)
        const onInput = (e) => {
            setValue(e.target.value)
        }
        const onBlur = () => {
            setDirty(true)
        }


        return {
            value, dirty, onInput, onBlur, ...valid
        }
    }

    const email = useInput('', {isEmpty: true, emailError: true, minLengthError: 3})
    const password = useInput('', {isEmpty: true, maxLengthError: 10, minLengthError: 3})
    return (
        <div className='form_container'>

            <form>
                <div className="mb-3">
                    {(email.dirty && email.isEmpty) && <div style={{color: "red"}}>Email is empty</div>}
                    {(email.dirty && email.emailError) && <div style={{color: "red"}}>Email is incorrect</div>}
                    {(email.dirty && email.minLengthError) && <div style={{color: "red"}}>Email is too short</div>}
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input onChange={e => email.onInput(e)}
                           onBlur={email.onBlur}
                           value={email.value}
                           type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    {(password.dirty && password.isEmpty) && <div style={{color: "red"}}>Password is empty</div>}
                    {(password.dirty && password.maxLengthError) && <div style={{color: "red"}}>Password is too long</div>}
                    {(password.dirty && password.minLengthError) && <div style={{color: "red"}}>Password is too short</div>}
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input onChange={e => password.onInput(e)}
                           onBlur={password.onBlur}
                           value={password.value}
                           type="password" className="form-control" id="exampleInputPassword1"/>
                </div>
                <button disabled={!email.validateInput || !password.validateInput} type="submit"
                        className="btn btn-primary">Submit
                </button>
            </form>
        </div>
    )
}

export default TrainDifficultValidationAgain