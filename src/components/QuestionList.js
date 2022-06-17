import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  // Get from fetch
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((question) => setQuestions(question));
  }, []);

  const questionItems = questions.map((q) => (
    <QuestionItem
      key={q.id}
      question={q}
      />
  ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */}
      {questionItems}
      </ul>
    </section>
  );
}

export default QuestionList;
