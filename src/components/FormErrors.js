import React from 'react'
import styled from 'styled-components';

const StyledErrors = styled.div`
    color: red;
    font-size: 1.5rem;
    margin: 2rem 0 0 4rem;
`

export default function FormErrors(props) {
    const { errors } = props;
    return (
        <StyledErrors>
            <div>{errors.userName}</div>
            <div>{errors.userType}</div>
            <div>{errors.password}</div>
            <div>{errors.email}</div>
        </StyledErrors>
    )
}

