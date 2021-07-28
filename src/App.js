import { useState } from 'react';
import './App.css';
import FeedbackOptions from './components/FeedbackOptions/FeedbackOptions';
import Statistics from './components/Statistics/Statistics';
import Notification from './components/Notification/Notification';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const countTotalFeedback = () => good + neutral + bad;

  const countPositiveFeedbackPercentage = () =>
    Math.round((good / countTotalFeedback()) * 100);

  const isEmpty = state => {
    const allValues = Object.values(state);

    if (allValues.some(value => value !== 0)) {
      return (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={countTotalFeedback()}
          positivePercentage={countPositiveFeedbackPercentage()}
        ></Statistics>
      );
    } else {
      return <Notification message="No feedback given" />;
    }
  };

  const onLeaveFeedback = ({ target }) => {
    if (target.textContent.toLowerCase() === 'good') {
      setGood(good + 1);
    }

    if (target.textContent.toLowerCase() === 'neutral') {
      setGood(neutral + 1);
    }

    if (target.textContent.toLowerCase() === 'bad') {
      setGood(bad + 1);
    }
  };

  return (
    <div className="container">
      <h2>Pleas leave feedback</h2>
      <FeedbackOptions
        options={{ good, neutral, bad }}
        onLeaveFeedback={onLeaveFeedback}
      />

      <h2>Statistics</h2>
      {isEmpty({ good, neutral, bad })}
    </div>
  );
}
