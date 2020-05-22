import React from 'react';
import { withRouter } from 'react-router-dom';
import  { BaseContainer, FormContainer, Container, Form, Label } from '../../helpers/layout';


class NotFound extends React.Component {
    constructor() {
        super();
    }

    async componentDidMount() {
    }

    render() {
        return (
            <BaseContainer>
                <FormContainer>
                <Container>
                    <h2>404 - PAGE NOT FOUND</h2>
                </Container>
                <Form>
                    <Label>Oops...this page does not exist... </Label>
                    <img className="error"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Error.svg/1200px-Error.svg.png"
                    alt="404"
                    />
                </Form>
                </FormContainer>
            </BaseContainer>
        );
    }
}

export default withRouter(NotFound);