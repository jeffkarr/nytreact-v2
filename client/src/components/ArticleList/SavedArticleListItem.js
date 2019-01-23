import React from "react";
import { Container, Row, Col } from "../Grid";
import Button from "../../components/Button";

// RecipeListItem renders a bootstrap list item containing data from the recipe api call
export const SavedArticleListItem = props => (
    <li className="list-group-item">
        <Container>
            <Row>
                <Col size="sm-10">
                    <a target={props.href} href={props.href}>
                        <h3>{props.headline}</h3>
                    </a>
                    <p>{props.date}</p>
                    <p>{props.byline}</p>
                </Col>
                <Col size="sm-2 align-middle">
                    <Button {...props} type="submit" className="float-right align-middle">Delete Article</Button>
                </Col>
            </Row>
        </Container>
    </li>
);
