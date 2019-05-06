import React from 'react'

export default function DropDown(props) {
        const {dropChange} = props
        return (
        <select dropChange={dropChange} >
        {/* code from https://codesandbox.io/s/w031p82nr5 */}
            <option value="parlor-palm">Parlor Palm</option>
            <option value="peace-lily">Peace Lily</option>
        </select>
    )}


    