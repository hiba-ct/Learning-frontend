import React from 'react';
import { Card, Row } from 'react-bootstrap';

const ServiceCard = ({ displayDataService, showServiceText, index }) => {
  return (
    <Row className="rounded" style={{ width: "100%", height: "auto" }}>
      <Card
        className="mx-5 rounded d-flex align-items-center justify-content-center"
        style={{ width: '18rem' }}
      >
        <Card.Body>
          <Card.Title className="d-flex justify-content-center align-items-center mt-5 p-3 text-danger">
            {displayDataService?.title}
          </Card.Title>
          {!showServiceText && (
            <Card.Text className="justify-content-center align-items-center text-warning">
              {displayDataService?.text}
            </Card.Text>
          )}
          <Card.Text className="fs-1 circle-bg-danger">
            {typeof index === 'number' ? index + 1 : '-'} {/* Handle invalid index */}
          </Card.Text>
        </Card.Body>
      </Card>
    </Row>
  );
};

export default ServiceCard;
