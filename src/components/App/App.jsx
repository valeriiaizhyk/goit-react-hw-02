import { useState, useEffect } from "react";
import Description from "../Description/Description";
import Options from "../Options/Options";
import Feedback from "../Feedback/Feedback";
import Notification from "../Notification/Notification";

const App = () => {
  const [feedback, setFeeback] = useState(
    () =>
      JSON.parse(localStorage.getItem("saved-feedback")) ?? {
        good: 0,
        neutral: 0,
        bad: 0,
      }
  );

  useEffect(() => {
    window.localStorage.setItem("saved-feedback", JSON.stringify(feedback));
  }, [feedback]);

  const updateFeedback = (feedbackType) => {
    setFeeback({
      ...feedback,
      [feedbackType]: feedback[feedbackType] + 1,
    });
  };

  const resetFeedback = () => {
    setFeeback({ good: 0, neutral: 0, bad: 0 });
  };

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;

  const positiveReviews = Math.round(
    ((feedback.good + feedback.neutral) / totalFeedback) * 100
  );

  return (
    <>
      <Description />
      <Options
        feedback={feedback}
        onUpdate={updateFeedback}
        onReset={resetFeedback}
        total={totalFeedback}
      />
      {totalFeedback > 0 && (
        <Feedback
          good={feedback.good}
          neutral={feedback.neutral}
          bad={feedback.bad}
          positive={positiveReviews}
        />
      )}
      <Notification total={totalFeedback} />
    </>
  );
};

export default App;
