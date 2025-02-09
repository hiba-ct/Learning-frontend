import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SERVER_URL from '../services/serverUrl';

const CoursesCards = ({ displayData, showDescription }) => {
  return (
    <Card className="course-card">
      {/* Resized Image */}
      <Card.Img
        variant="top"
        src={`${SERVER_URL}/uploads/${displayData?.courseImg}`}
        alt={displayData?.course}
        className="course-img"
      />

      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-white text-center fw-bold">
          {displayData?.course}
        </Card.Title>

        {!showDescription && (
          <Card.Text className="text-muted text-white">
            {displayData?.discription}
          </Card.Text>
        )}

        {/* Join Now Button at Bottom */}
        <div className="mt-auto text-center">
          <Link to="/contact">
            <Button variant="danger" className="w-100">
              <FontAwesomeIcon icon={faGraduationCap} /> Join Now
            </Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CoursesCards;
