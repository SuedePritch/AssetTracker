import React, { useState } from 'react'
import './Form.scss'
import { useQuery, useMutation } from '@apollo/client';
import { ALL_CATEGORIES } from '../../utils/queries';
import { ADD_ASSET } from '../../utils/mutations';

function AddAsset() {
    const [addAssetMutation] = useMutation(ADD_ASSET);
    const [formState, setFormState] = useState({ name: '', description: '', });
    let categories;
    const { loading, data } = useQuery(ALL_CATEGORIES);
    if (loading) return 'Loading...';
    if (!loading) {
        categories = data.allCategories;
    }


    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const addAsset = await addAssetMutation({
                variables: { ...formState },
            });
            console.log(addAsset);
            return addAsset;
        } catch (e) {
            console.error(e);

        }
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };
    return (
        <>
            <form className='form' onSubmit={handleFormSubmit}>
                <div className='form-field add-asset'>
                    <input placeholder='name' name='name' type='text' id='name'
                        onChange={handleChange}></input>
                </div>
                <div className='form-field add-asset'>
                    <input placeholder='description' name='description' type='text' id='description'
                        onChange={handleChange}></input>
                </div>
                <div className='form-field add-asset'>
                    <select
                        name="category"
                        id="category"
                        defaultValue="Select a Category"
                        onChange={handleChange}>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <button className='form-field form-field-button add-asset ' type='submit' >Login </button>
            </form>
        </>
    )
}

export default AddAsset