import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import ModalForHistory from "./ModalFoHistory";

const DynamicHistoryComponent = ({
  fetchUrl,
  loadingMessage = "Loading history...",
  errorMessage = "Failed to fetch history.",
  dateFormat = 'en-US',
  dateOptions = { year: 'numeric', month: 'short', day: 'numeric' },
  renderItem,
}) => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [historyDetails, sethistoryDetails] = useState({})
  const handleClose = (agent) => {
    sethistoryDetails(agent);
    setShow(!show);
  }


  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(fetchUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setHistoryData(data.slice(0, 10));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchHistory();
  }, [fetchUrl]);

  const formatNotificationDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));

    if (diffDays > 7) {
      return date.toLocaleDateString(dateFormat, dateOptions);
    } else if (diffDays > 0) {
      return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes} ${diffMinutes === 1 ? 'minute' : 'minutes'} ago`;
    } else {
      return 'Just now';
    }
  };

  if (loading) return <p>{loadingMessage}</p>;
  if (error) return <p>{errorMessage}</p>;

  return (
    <div className="history-container">
      <ul className="history-ul">
        {historyData.map((item) => (
          <li className="history-li" key={item.id} onClick={() =>handleClose(item)} >
            {renderItem ? renderItem(item) : (
              <>
                {item.prompt_text}<br />
                {formatNotificationDate(item.timestamp)}
              </>
            )}
          </li>
        ))}
      </ul>
      <ModalForHistory show={show} handleClose={handleClose} agentDatails={historyDetails} />
    </div>
  );
};

DynamicHistoryComponent.propTypes = {
  fetchUrl: PropTypes.string.isRequired,
  loadingMessage: PropTypes.string,
  errorMessage: PropTypes.string,
  dateFormat: PropTypes.string,
  dateOptions: PropTypes.object,
  renderItem: PropTypes.func,
};

export default DynamicHistoryComponent;
