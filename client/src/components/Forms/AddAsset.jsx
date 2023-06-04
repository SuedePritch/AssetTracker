import React from 'react'

function AddAsset() {
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log('Add Asset Form Submitted')
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(name, value)
    };
    return (
        <>
            <form className='form' onSubmit={handleFormSubmit}>
                <div className='form-field login'>
                    <input placeholder='Email' name='email' type='email' id='email'
                        onChange={handleChange}></input>
                </div>
                <div className='form-field login'>
                    <input placeholder='Password' name='password' type='password' id='password'
                        onChange={handleChange}></input>
                </div>
                <button className='form-field form-field-button login ' type='submit' >Login </button>
            </form>
        </>
    )
}

export default AddAsset