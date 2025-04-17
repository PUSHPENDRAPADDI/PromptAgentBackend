import React, { useContext, useState } from 'react'
import { AgentContext } from '../context/AgentContext';
import './PropertiesForComponent.css'

const PropertiesForComponent = () => {
    const { state, setState } = useContext(AgentContext);

    const handleSave = () => {
    }

    const renderProperties = (properties) => {
        return (
            <div className="properties-container">
                {Object.entries(properties).map(([key, value]) => (
                    <div key={key} className="property-group">
                        <strong style={{ display: 'block' }}>{key.toUpperCase()}:</strong>
                        {Array.isArray(value) ? (
                            value.map((item) => (
                                <button key={item} className="property-button">
                                    {item}
                                </button>
                            ))
                        ) : (
                            <>
                                <button className="property-button-save">{value}</button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div>
            {state.properties && (
                <div className='main-property-contianer'>
                    <div className="properties-display">
                        <h3>{state.properties.name} Properties</h3>
                        {renderProperties(state.properties)}
                    </div>
                    <button className="property-button" onclick={handleSave}>
                        Save
                    </button>
                    <button className="property-button-delete" onclick={handleSave}>
                        Delete
                    </button>
                </div>
            )}
        </div >
    )
}

export default PropertiesForComponent
